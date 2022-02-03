
import { QuorumConfig } from "../types/quorumConfig";
import { NodeKeys } from "../types/nodeKeys";
import path from "path";
import fs from "fs";

const TEMPLATES_PATH = path.join(__dirname, "../templates");
const GOQ_SUB = "/goQuorum";
const BESU_SUB = "/besu";

export function createTimestamp(): string {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString()
    .substr(0, 19)
    .replace('T', '-').replace(/:/g, '-');
}

export function setupOutputFolder(path: string, quorumConfig: QuorumConfig, templatesPath = TEMPLATES_PATH): string {
  // create the base path if it doesnt exist
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
  console.log(templatesPath);
  // fs.copyFileSync(templatesPath + '/README.md', path + '/README.md');
  // save the values from the user to file
  fs.writeFileSync(path + "/userData.json", JSON.stringify(quorumConfig, null, 2));
  [GOQ_SUB, BESU_SUB].forEach((client) => {
    fs.mkdirSync(path + client, { recursive: true });
  });
  return path;
}

export function writeNodeKeys(path: string, nodekeys: NodeKeys): void {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
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

export function createStaticNodes(path: string, nodes: string[]): void {
  const staticNodes: string[] = nodes.map(_ => "enode://" + _ + "@<HOST>:30303");
  const staticNodesGoQ: string[] = nodes.map(_ => "enode://" + _ + "@<HOST>:30303?discport=0&raftport=53000");
  fs.writeFileSync(path + BESU_SUB + "/static-nodes.json", JSON.stringify(staticNodes, null, 2));
  fs.writeFileSync(path + GOQ_SUB + "/static-nodes.json", JSON.stringify(staticNodesGoQ, null, 2));
}

export function createGoQuorumPermissionsFile(path: string, nodes: string[]): void {
  const staticNodes: string[] = nodes.map(_ => "enode://" + _ + "@<HOST>:30303?discport=0&raftport=53000");
  fs.writeFileSync(path + GOQ_SUB + "/permissioned-nodes.json", JSON.stringify(staticNodes, null, 2));
  fs.writeFileSync(path + GOQ_SUB + "/disallowed-nodes.json", JSON.stringify([], null, 2));
}

export function createBesuPermissionsFile(path: string, nodes: string[]): void {
  const staticNodes: string[] = nodes.map(_ => "enode://" + _ + "@<HOST>:30303");
  fs.writeFileSync(path + BESU_SUB + "/permissioned-nodes.toml", "nodes-allowlist=");
  fs.appendFileSync(path + BESU_SUB + "/permissioned-nodes.toml", JSON.stringify(staticNodes, null, 2));
}
