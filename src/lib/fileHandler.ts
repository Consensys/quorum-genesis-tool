
import { QuorumConfig } from "../types/quorumConfig";
import { NodeKeys } from "../types/nodeKeys";
import path from "path";
import fse from "fs-extra";

const TEMPLATES_PATH = path.join(__dirname, "../templates");

export function createTimestamp() : string {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000).toISOString()
                                                                                .substr(0,19)
                                                                                .replace('T', '-').replace(/:/g, '-');
}

// TODO: check whether we copy both genesis files or just one per the consensus algorithm
export function setupOutputFolder(path : string, quorumConfig: QuorumConfig, templatesPath=TEMPLATES_PATH) : string {
  // create the base path if it doesnt exist
  if (!fse.existsSync(path)) fse.mkdirSync(path, {recursive: true});
  fse.copySync(templatesPath+'/README.md', path+'/README.md');
  fse.copySync(templatesPath+'/genesis/', path+'/genesis/');
  // save the values from the user to file
  fse.writeFileSync(path + "/userData.json", JSON.stringify(quorumConfig, null, 2));
  return path;
}

// TODO: besu config.toml + tessera config
export function writeNodeKeys(path: string, nodekeys: NodeKeys) : void {
  if (!fse.existsSync(path)) fse.mkdirSync(path, {recursive: true});
  // nodekeys
  fse.writeFileSync(path + "/nodekey", nodekeys.privateKey.toString('hex'));
  fse.writeFileSync(path + "/nodekey.pub", nodekeys.publicKey.toString('hex'));
  fse.writeFileSync(path + "/address", nodekeys.address.toString('hex'));
  // account keys
  fse.writeFileSync(path + "/accountKeystore", nodekeys.ethAccount.keystore);
  fse.writeFileSync(path + "/accountPassword", nodekeys.ethAccount.password);
  fse.writeFileSync(path + "/accountPrivateKey", nodekeys.ethAccount.privateKey);
  fse.writeFileSync(path + "/accountAddress", nodekeys.ethAccount.address);
}