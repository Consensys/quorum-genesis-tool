
import * as njks from "nunjucks";
import { QuorumConfig } from "../types/quorumConfig";
import { NodeKeys } from "../types/nodeKeys";
import fs from "fs";
import path from "path";

const GOQ_SUB = "/goQuorum";
const BESU_SUB = "/besu";
njks.configure({ autoescape: false });

export function createTimestamp(): string {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString()
    .substr(0, 19)
    .replace('T', '-').replace(/:/g, '-');
}

export function setupOutputFolder(fpath: string, quorumConfig: QuorumConfig): string {
  // create the base path if it doesnt exist
  if (!fs.existsSync(fpath)) fs.mkdirSync(fpath, { recursive: true });

  // template for the README.md
  const templateSrc = fs.readFileSync(path.resolve(__dirname, '../templates/README.md'), "utf-8");
  const result = njks.renderString(templateSrc, quorumConfig);
  fs.writeFileSync(fpath + '/README.md', result);

  // save the values from the user to file
  fs.writeFileSync(fpath + "/userData.json", JSON.stringify(quorumConfig, null, 2));
  [GOQ_SUB, BESU_SUB].forEach((client) => {
    fs.mkdirSync(fpath + client, { recursive: true });
  });
  return fpath;
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

export function createStaticNodes(path: string, nodes: string[], besu: boolean, goq: boolean): void {
  const staticNodes: string[] = nodes.map(_ => "enode://" + _ + "@<HOST>:30303");
  const staticNodesGoQ: string[] = nodes.map(_ => "enode://" + _ + "@<HOST>:30303?discport=0&raftport=53000");
  if (besu === true) {
    fs.writeFileSync(path + BESU_SUB + "/static-nodes.json", JSON.stringify(staticNodes, null, 2));
  }
  if (goq === true) {
    fs.writeFileSync(path + GOQ_SUB + "/static-nodes.json", JSON.stringify(staticNodesGoQ, null, 2));
  }
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
