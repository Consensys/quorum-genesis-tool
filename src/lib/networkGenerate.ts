
import { QuorumConfig, PrivacyConfig } from "../types/quorumConfig";
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
    console.log(validators);

    console.log("Generating extra data string");
    const validatorAddressBuffers : Address[] = validators.map(v => v.address);
    const extraData : string = nodekeys.generateExtraDataString(validatorAddressBuffers, quorumConfig.consensus);
    genesis.updateBesuGenesis(outputDir, quorumConfig, extraData);

    console.log("Creating bootnodes...");
    const bootnodes = await generateNodeConfig(quorumConfig.bootnodes, "bootnode", quorumConfig.privacy, outputDir);
    console.log(bootnodes);

    console.log("Creating members...");
    const members = await generateNodeConfig(quorumConfig.members, "member", quorumConfig.privacy, outputDir);
    console.log(members);

    return outputDir;
}