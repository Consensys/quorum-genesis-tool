
import { QuorumConfig } from "../types/quorumConfig";
import * as fileHandler from "./fileHandler";
import * as nodekeys from "./nodeKeys";

const OUTPUT_BASE_DIR = "./output"


export async function generateNetworkConfig(quorumConfig: QuorumConfig) : Promise<string> {

    // Create a new root folder each time - dont destroy anything that existed
    const ts : string = fileHandler.createTimestamp();
    const output_dir : string = OUTPUT_BASE_DIR + "/" + ts;

    fileHandler.setupOutputFolder(output_dir, quorumConfig);

    console.log("Creating validators config")
    
    const nValidators = quorumConfig.validators
    let validators = []
    for(let i=0; i<nValidators; i++) {
      let nodeData = await nodekeys.generateNodeKeys(quorumConfig.privacyPassword);
      validators.push(nodeData)
    }
    validators.map((v, i) => {
      fileHandler.writeNodeKeys(output_dir + "/validator" + i, v, quorumConfig);
    })
  
    // console.log("Generating extra data string")
    // let validatorAddressBuffers = validators.map(v => v.address)
    // let extraDataString = ibftGen.generateIbftExtraDataString(validatorAddressBuffers).toString('hex')
    // console.log("Updating genesis file")

    return output_dir;
}