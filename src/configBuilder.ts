// import { renderTemplateDir, validateDirectoryExists, copyFilesDir } from "./fileRendering";
// import path from "path";

export interface ConfigContext {
  consensusAlgo: "ibft1" | "ibft2" | "qbft" | "clique" | "raft";
  chainID: number;
  blockperiod: boolean;
  requesttimeout: number;
  epochlength: number;
  difficulty: number;
  gaslimit: number;
  coinbase: number; // maybe take string of hex?
  maxsize: number;
  txnsize: number;
  validators: number;
  members: number;
  bootnodes: number;
  curve: "k1" | "r1";
  staticnodes: boolean;
  permissions: boolean;
  tessera: boolean;
  userinput: boolean;
  outputPath: string;
}

export function buildConfig(context: ConfigContext): void {
  console.log(context);
  // const templatesDirPath = path.resolve(__dirname, "..", "templates");
  // const filesDirPath = path.resolve(__dirname, "..", "files");
  // let projectToolName = "";
  // let projectToolPath = "";
  // let projectToolOutputPath = "";

  // try {
  //   const blockchainClient = context.clientType === "besu" ? "Besu" : "GoQuorum" ;

  //   if (projectToolName !== "") {
  //     console.log(`Installing ${projectToolName} quickstart with ` +
  //       `${blockchainClient} clients to` + `${context.outputPath}`);

  //     const orchestrateTemplatePath = path.resolve(templatesDirPath, projectToolPath);
  //     const orchestrateFilesPath = path.resolve(filesDirPath, projectToolPath);

  //     if (validateDirectoryExists(orchestrateTemplatePath)) {
  //       renderTemplateDir(orchestrateTemplatePath, context);
  //     }

  //     if (validateDirectoryExists(orchestrateFilesPath)) {
  //       copyFilesDir(orchestrateFilesPath, context);
  //     }

  //     projectToolOutputPath = context.outputPath;
  //     context.outputPath += "/network";
  //     context.nodeCount = 3;
  //   }

  //   console.log(`Installing ` +
  //     `${blockchainClient} quickstart ` + `to ${context.outputPath}`);

  //   const commonTemplatePath = path.resolve(templatesDirPath, "common");
  //   const clientTemplatePath = path.resolve(templatesDirPath, context.clientType);

  //   const commonFilesPath = path.resolve(filesDirPath, "common");
  //   const clientFilesPath = path.resolve(filesDirPath, context.clientType);

  //   if (validateDirectoryExists(commonTemplatePath)) {
  //     renderTemplateDir(commonTemplatePath, context);
  //   }

  //   if (validateDirectoryExists(clientTemplatePath)) {
  //     renderTemplateDir(clientTemplatePath, context);
  //   }

  //   if (validateDirectoryExists(commonFilesPath)) {
  //     copyFilesDir(commonFilesPath, context);
  //   }

  //   if (validateDirectoryExists(clientFilesPath)) {
  //     copyFilesDir(clientFilesPath, context);
  //   }

  //   console.log(`Installation complete.`);

  // } catch (err: any) {
  //     console.log(`Installation failed. Error: ${(err as Error).message}`);
  //   }
  // process.exit(1);
  }


