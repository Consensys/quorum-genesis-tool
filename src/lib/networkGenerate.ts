
import { QuorumConfig } from "../types/quorumConfig";
import { Consensus } from "../types/consensus";
import { NodeKeys, Address } from "../types/nodeKeys";
import { CryptoCurve } from "../types/cryptoCurve";
import * as genesis from "./genesisGenerate";
import * as fileHandler from "./fileHandler";
import * as nodekeys from "./nodeKeys";
import * as besuConfig from "./besuConfig";
import { tesseraOutput } from "./tessera";
import { createTesseraConfig } from "./tesseraConfig";

async function generateNodeConfig(numNodes: number, nodeType: string, accountPassword: string, curve: CryptoCurve, outputDir: string): Promise<NodeKeys[]> {
  const nNodes = numNodes;
  const nodes: NodeKeys[] = [];
  for (let i = 0; i < nNodes; i++) {
    const nodeData = await nodekeys.generateNodeKeys(accountPassword, curve);
    nodes.push(nodeData);
  }
  nodes.map((v, i) => {
    fileHandler.writeNodeKeys(outputDir + "/" + nodeType + i.toString(), v);
  });
  return nodes;
}

export async function generateNetworkConfig(quorumConfig: QuorumConfig): Promise<string> {
  // Create a new root folder each time - dont destroy anything that existed
  const OUTPUT_BASE_DIR = `${quorumConfig.outputPath}`;
  const ts: string = fileHandler.createTimestamp();
  const outputDir: string = OUTPUT_BASE_DIR + "/" + ts;

  fileHandler.setupOutputFolder(outputDir, quorumConfig);

  console.log("Creating bootnodes...");
  const bootnodes = await generateNodeConfig(quorumConfig.bootnodes, "bootnode", quorumConfig.accountPassword, quorumConfig.curve, outputDir);

  console.log("Creating members...");
  const members = await generateNodeConfig(quorumConfig.members, "member", quorumConfig.accountPassword, quorumConfig.curve, outputDir);

  if (quorumConfig.tesseraEnabled) {
    if (quorumConfig.tesseraPassword === '') console.log("No password entered. Will not encrypt private key.");
    console.log("Generating tessera keys...");
    for (let val = 0; val < quorumConfig.members; val++) {
      const { privateKeyPath, publicKeyPath } = await tesseraOutput(quorumConfig.tesseraPassword, outputDir, val);
      createTesseraConfig(privateKeyPath, publicKeyPath, quorumConfig, outputDir, val);
    }
  }

  console.log("Creating validators...");
  const validators = await generateNodeConfig(quorumConfig.validators, "validator", quorumConfig.accountPassword, quorumConfig.curve, outputDir);
  const validatorAddressBuffers: Address[] = validators.map(v => v.address);
  const extraData: string = nodekeys.generateExtraDataString(validatorAddressBuffers, quorumConfig.consensus);

  // concatenate NodeKeys array to pass into the Genesis functions
  const NodeKeyConcat: NodeKeys[] = bootnodes.concat(members, validators);

  // static nodes generation
  const allNodes: NodeKeys[] = validators.concat(bootnodes, members);
  const allNodesEnodes: string[] = allNodes.map(_ => _.publicKey.toString('hex'));

  const consensus = quorumConfig.consensus;
  switch (consensus) {
    case Consensus.clique: {
      fileHandler.createStaticNodes(outputDir, allNodesEnodes, true, true);
      genesis.createBesuGenesis(outputDir, quorumConfig, extraData, NodeKeyConcat);
      besuConfig.createBesuConfig(bootnodes, quorumConfig, outputDir);
      genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData, NodeKeyConcat);
      fileHandler.createBesuPermissionsFile(outputDir, allNodesEnodes);
      fileHandler.createGoQuorumPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
    case Consensus.raft: {
      fileHandler.createStaticNodes(outputDir, allNodesEnodes, false, true);
      genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData, NodeKeyConcat);
      fileHandler.createGoQuorumPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
    case Consensus.ibft: {
      fileHandler.createStaticNodes(outputDir, allNodesEnodes, false, true);
      genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData, NodeKeyConcat);
      fileHandler.createGoQuorumPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
    case Consensus.ibft2: {
      fileHandler.createStaticNodes(outputDir, allNodesEnodes, true, false);
      genesis.createBesuGenesis(outputDir, quorumConfig, extraData, NodeKeyConcat);
      besuConfig.createBesuConfig(bootnodes, quorumConfig, outputDir);
      fileHandler.createBesuPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
    // qbft
    default: {
      fileHandler.createStaticNodes(outputDir, allNodesEnodes, true, true);
      genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData, NodeKeyConcat);
      genesis.createBesuGenesis(outputDir, quorumConfig, extraData, NodeKeyConcat);
      besuConfig.createBesuConfig(bootnodes, quorumConfig, outputDir);
      fileHandler.createBesuPermissionsFile(outputDir, allNodesEnodes);
      fileHandler.createGoQuorumPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
  }

  console.log("Artifacts in folder: " + outputDir);
  return outputDir;
}
