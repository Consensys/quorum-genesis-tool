import * as njks from "nunjucks";
import * as fs from "fs";
import path from "path";
import { QuorumConfig } from "../types/quorumConfig";

njks.configure({ autoescape: false });
function renderConfigToml(output: string, values: object, member: number) {
  const templateSrc = fs.readFileSync(path.resolve(__dirname, '../templates/tesseraConfigTemplate.json'), "utf-8");
  const result = njks.renderString(templateSrc, values);
  fs.writeFileSync(`${output}` + `/member${member}/tessera-config.json`, result);
}

export function createTesseraConfig(privateKeyPath: string, publicKeyPath: string, quorumConfig: QuorumConfig, output: string, member: number) {
  // console.log("Rendering Tessera config file...");
  const mapping = {
    tesseraPassword: quorumConfig.tesseraPassword,
    tesseraPrivateKey: fs.readFileSync(privateKeyPath, 'utf-8'),
    tesseraPublicKey: fs.readFileSync(publicKeyPath, 'utf-8')
  };
  renderConfigToml(output, mapping, member);
}
