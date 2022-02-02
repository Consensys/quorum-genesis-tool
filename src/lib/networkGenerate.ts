
import { QuorumConfig, PrivacyConfig } from "../types/quorumConfig";
import { Consensus } from "../types/consensus";
import { NodeKeys, Address } from "../types/nodeKeys";
import * as genesis from "./genesisGenerate";
import * as fileHandler from "./fileHandler";
import * as nodekeys from "./nodeKeys";

const OUTPUT_BASE_DIR = "./output";

async function generateNodeConfig(numNodes: number, nodeType: string, privacy: PrivacyConfig, outputDir: string) : Promise<NodeKeys[]> {
  const nNodes = numNodes;
  const nodes : NodeKeys[] = [];
  for(let i=0; i<nNodes; i++) {
    const nodeData = await nodekeys.generateNodeKeys(privacy.password);
    nodes.push(nodeData);
  }
  nodes.map((v, i) => {
    fileHandler.writeNodeKeys(outputDir + "/" + nodeType + i.toString(), v);
  });
  return nodes;
}

export async function generateNetworkConfig(quorumConfig: QuorumConfig) : Promise<string> {
    // Create a new root folder each time - dont destroy anything that existed
    const ts : string = fileHandler.createTimestamp();
    const outputDir : string = OUTPUT_BASE_DIR + "/" + ts;

    fileHandler.setupOutputFolder(outputDir, quorumConfig);

    console.log("Creating validators...");
    const validators = await generateNodeConfig(quorumConfig.validators, "validator", quorumConfig.privacy, outputDir);
    console.log("Generating extra data string");
    const validatorAddressBuffers : Address[] = validators.map(v => v.address);
    const extraData : string = nodekeys.generateExtraDataString(validatorAddressBuffers, quorumConfig.consensus);

    const consensus = quorumConfig.consensus;
    switch(consensus) {
      case Consensus.clique: {
        genesis.createBesuGenesis(outputDir, quorumConfig, extraData);
        genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData);
        break;
      }
      case Consensus.raft: {
        genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData);
        break;
      }
      case Consensus.ibft: {
        genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData);
        break;
      }
      case Consensus.ibft2: {
        genesis.createBesuGenesis(outputDir, quorumConfig, extraData);
        break;
      }
      // qbft
      default: {
        genesis.createGoQuorumGenesis(outputDir, quorumConfig, extraData);
        genesis.createBesuGenesis(outputDir, quorumConfig, extraData);

        break;
      }
    }

    console.log("Creating bootnodes...");
    const bootnodes = await generateNodeConfig(quorumConfig.bootnodes, "bootnode", quorumConfig.privacy, outputDir);

    console.log("Creating members...");
    const members = await generateNodeConfig(quorumConfig.members, "member", quorumConfig.privacy, outputDir);

    // static nodes generation
    const allNodes : NodeKeys[] = validators.concat(bootnodes, members);
    const allNodesEnodes : string [] = allNodes.map(_ => _.publicKey.toString('hex'));
    fileHandler.createStaticNodes(outputDir, allNodesEnodes);

    return outputDir;
}
