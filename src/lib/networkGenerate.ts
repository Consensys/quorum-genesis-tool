
import { QuorumConfig } from "../types/quorumConfig";
import { Consensus } from "../types/consensus";
import { NodeKeys, Address } from "../types/nodeKeys";
import * as genesis from "./genesisGenerate";
import * as fileHandler from "./fileHandler";
import * as nodekeys from "./nodeKeys";
import * as besuConfig from "./besuConfig";

const OUTPUT_BASE_DIR = "./output";

async function generateNodeConfig(numNodes: number, nodeType: string, accountPassword: string, outputDir: string): Promise<NodeKeys[]> {
  const nNodes = numNodes;
  const nodes: NodeKeys[] = [];
  for (let i = 0; i < nNodes; i++) {
    const nodeData = await nodekeys.generateNodeKeys(accountPassword);
    nodes.push(nodeData);
  }
  nodes.map((v, i) => {
    fileHandler.writeNodeKeys(outputDir + "/" + nodeType + i.toString(), v);
  });
  return nodes;
}

export async function generateNetworkConfig(quorumConfig: QuorumConfig): Promise<string> {
  // Create a new root folder each time - dont destroy anything that existed
  const ts: string = fileHandler.createTimestamp();
  const outputDir: string = OUTPUT_BASE_DIR + "/" + ts;

  fileHandler.setupOutputFolder(outputDir, quorumConfig);

  console.log("Creating bootnodes...");
  const bootnodes = await generateNodeConfig(quorumConfig.bootnodes, "bootnode", quorumConfig.accountPassword, outputDir);

  console.log("Rendering Besu config file...");
  const mapping = {
    bootnodes: JSON.stringify(bootnodes.map(_ => _.publicKey.toString('hex')).map(_ => "enode://" + _ + "@<HOST>:30303"))
  };
  console.log(mapping);
  besuConfig.renderConfigToml(outputDir, mapping);

  console.log("Creating members...");
  const members = await generateNodeConfig(quorumConfig.members, "member", quorumConfig.accountPassword, outputDir);

  console.log("Creating validators...");
  const validators = await generateNodeConfig(quorumConfig.validators, "validator", quorumConfig.accountPassword, outputDir);
  console.log("Generating extra data string");
  const validatorAddressBuffers: Address[] = validators.map(v => v.address);
  const extraData: string = nodekeys.generateExtraDataString(validatorAddressBuffers, quorumConfig.consensus);

  // static nodes generation
  const allNodes: NodeKeys[] = validators.concat(bootnodes, members);
  const allNodesEnodes: string[] = allNodes.map(_ => _.publicKey.toString('hex'));
  fileHandler.createStaticNodes(outputDir, allNodesEnodes);

  const consensus = quorumConfig.consensus;
  switch (consensus) {
    case Consensus.clique: {
      genesis.createBesuGenesis(outputDir, quorumConfig, extraData);
      genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData);
      fileHandler.createBesuPermissionsFile(outputDir, allNodesEnodes);
      fileHandler.createGoQuorumPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
    case Consensus.raft: {
      genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData);
      fileHandler.createGoQuorumPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
    case Consensus.ibft: {
      genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData);
      fileHandler.createGoQuorumPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
    case Consensus.ibft2: {
      genesis.createBesuGenesis(outputDir, quorumConfig, extraData);
      fileHandler.createBesuPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
    // qbft
    default: {
      genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData);
      genesis.createBesuGenesis(outputDir, quorumConfig, extraData);
      fileHandler.createBesuPermissionsFile(outputDir, allNodesEnodes);
      fileHandler.createGoQuorumPermissionsFile(outputDir, allNodesEnodes);
      break;
    }
  }

  return outputDir;
}
