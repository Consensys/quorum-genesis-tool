import * as njks from "nunjucks";
import * as fs from "fs";
import path from "path";
import { NodeKeys } from "../types/nodeKeys";
import { QuorumConfig } from "../types/quorumConfig";

njks.configure({ autoescape: false });
function renderConfigToml(output: string, values: object) {
  const cfg = njks.render(path.resolve(__dirname, '../templates/besuConfigTemplate.toml'), values);
  fs.writeFileSync(output + '/besu-config.toml', cfg);
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
