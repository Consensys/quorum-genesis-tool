import * as njks from "nunjucks";
import * as fs from "fs";
import path from "path";

njks.configure({ autoescape: false });
export function renderConfigToml(output: string, values: object) {
  const cfg = njks.render(path.resolve(__dirname, '../templates/besuConfigTemplate.toml'), values);
  fs.writeFileSync(output + '/besu-config.toml', cfg);
}
