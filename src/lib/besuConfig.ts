import * as njks from "nunjucks";
import * as fs from "fs";
import path from "path";
import { NodeKeys } from "../types/nodeKeys";
import { QuorumConfig } from "../types/quorumConfig";

njks.configure({ autoescape: false });
function renderConfigToml(output: string, values: object) {
  const templateSrc = fs.readFileSync(path.resolve(__dirname, '../templates/besuConfigTemplate.toml'), "utf-8");
  const result = njks.renderString(templateSrc, values);
  fs.writeFileSync(output + "/besu/config.toml", result);
}

export function createBesuConfig(bootnodes: NodeKeys[], quorumConfig: QuorumConfig, output: string) {
  // console.log("Rendering Besu config file...");
  const mapping = {
    bootnodes: JSON.stringify(bootnodes.map(_ => _.publicKey.toString('hex')).map(_ => "enode://" + _ + "@<HOST>:30303")
    ),
    chainID: quorumConfig.chainID,
  };
  renderConfigToml(output, mapping);
}
