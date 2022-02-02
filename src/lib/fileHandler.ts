
import { QuorumConfig } from "../types/quorumConfig";
import { NodeKeys } from "../types/nodeKeys";
import path from "path";
import fs from "fs";

const TEMPLATES_PATH = path.join(__dirname, "../templates");

export function createTimestamp() : string {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000).toISOString()
                                                                                .substr(0,19)
                                                                                .replace('T', '-').replace(/:/g, '-');
}

// TODO: check whether we copy both genesis files or just one per the consensus algorithm
export function setupOutputFolder(path : string, quorumConfig: QuorumConfig, templatesPath=TEMPLATES_PATH) : string {
  // create the base path if it doesnt exist
  if (!fs.existsSync(path)) fs.mkdirSync(path, {recursive: true});
  fs.copyFileSync(templatesPath+'/README.md', path+'/README.md');
  // save the values from the user to file
  fs.writeFileSync(path + "/userData.json", JSON.stringify(quorumConfig, null, 2));
  return path;
}

// TODO: besu config.toml
export function writeNodeKeys(path: string, nodekeys: NodeKeys) : void {
  if (!fs.existsSync(path)) fs.mkdirSync(path, {recursive: true});
  // nodekeys
  fs.writeFileSync(path + "/nodekey", nodekeys.privateKey.toString('hex'));
  fs.writeFileSync(path + "/nodekey.pub", nodekeys.publicKey.toString('hex'));
  fs.writeFileSync(path + "/address", nodekeys.address.toString('hex'));
  // account keys
  fs.writeFileSync(path + "/accountKeystore", nodekeys.ethAccount.keystore);
  fs.writeFileSync(path + "/accountPassword", nodekeys.ethAccount.password);
  fs.writeFileSync(path + "/accountPrivateKey", nodekeys.ethAccount.privateKey);
  fs.writeFileSync(path + "/accountAddress", nodekeys.ethAccount.address);
}

export function createStaticNodes(path : string, nodes: string[]) : string {
  const staticNodes : string [] = nodes.map(_ => "enode://"+ _ +"@<HOST>:30303");
  fs.writeFileSync(path + "/static-nodes.json", JSON.stringify(staticNodes, null, 2));
  return path;
}

export function createPermissions(path : string, nodes: string[]) : string {
  const staticNodes : string [] = nodes.map(_ => "enode://"+ _ +"@<HOST>:30303");
  fs.writeFileSync(path + "/static-nodes.json", JSON.stringify(staticNodes, null, 2));
  return path;
}

