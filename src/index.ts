import { rootQuestion } from "./questions";
import { QuestionRenderer } from "./questionRenderer";
import { generateNetworkConfig } from "./lib/networkGenerate";
import { QuorumConfig } from "./types/quorumConfig";
import yargs from "yargs/yargs";
import chalk from "chalk";
// import { CryptoCurve } from "./types/cryptoCurve";

export async function main(): Promise<void> {
  if (process.platform === "win32") {
    console.error(
      chalk.red(
        "Unfortunately this tool is not compatible with Windows at the moment.\n" +
          "We recommend running it under Windows Subsystem For Linux 2 with Docker Desktop.\n" +
          "Please visit the following pages for installation instructions.\n\n" +
          "https://docs.microsoft.com/en-us/windows/wsl/install-win10\n" +
          "https://docs.docker.com/docker-for-windows/wsl/"
      )
    );
    process.exit(1);
  }

  let answers = {};
  if (process.argv.slice(2).length > 0) {
    const args = await yargs(process.argv.slice(2))
      .options({
        consensus: {
          type: "string",
          demandOption: true,
          default: "qbft",
          choices: ["ibft", "ibft2", "qbft", "clique", "raft"],
          describe: "Consensus algorithm to use",
        },
        chainID: {
          type: "number",
          demandOption: true,
          default: 1337,
          describe: "ChainID for blockchain",
        },
        blockperiod: {
          type: "number",
          demandOption: true,
          default: 5,
          describe: "Number of seconds per block",
        },
        requestTimeout: {
          type: "number",
          demandOption: false,
          default: 10,
          describe: "Minimum request timeout for each round",
        },
        epochLength: {
          type: "number",
          demandOption: true,
          default: 30000,
          describe: "Number of blocks after which votes reset",
        },
        difficulty: {
          type: "number",
          demandOption: true,
          default: 1,
          describe: "Difficulty of network",
        },
        gasLimit: {
          type: "string",
          demandOption: true,
          default: "0xFFFF",
          describe: "Block gas limit",
        },
        coinbase: {
          type: "string",
          demandOption: false,
          default: "0x0000000000000000000000000000000000000000",
          describe: "Address to pay mining rewards to",
        },
        maxCodeSize: {
          type: "number",
          demandOption: false,
          default: 64,
          describe: "Maximum contract size (kb)",
        },
        txnSizeLimit: {
          type: "number",
          demandOption: false,
          default: 64,
          describe: "Maximum transaction size (kb)",
        },
        validators: {
          type: "number",
          demandOption: true,
          default: 4,
          describe: "Number of validator node keys to generate",
        },
        members: {
          type: "number",
          demandOption: true,
          default: 1,
          describe: "Number of member node keys to generate",
        },
        bootnodes: {
          type: "number",
          demandOption: true,
          default: 2,
          describe: "Number of bootnode node keys to generate",
        },
        // curve: { type: 'string', demandOption: false, default: CryptoCurve.k1, choices: [CryptoCurve.k1, CryptoCurve.r1], describe: 'Type of curve for keys' },
        accountPassword: {
          type: "string",
          demandOption: false,
          default: "",
          describe: "Password for keys",
        },
        outputPath: {
          type: "string",
          demandOption: false,
          default: "./output",
          describe: "Output path relative to current directory",
        },
        tesseraEnabled: {
          type: "boolean",
          demandOption: false,
          default: false,
          describe: "Whether to generate tessera keys",
        },
        tesseraPassword: {
          type: "string",
          demandOption: false,
          default: "",
          describe: "Set password to encrypt generated keys",
        },
        quickstartDevAccounts: {
          type: "boolean",
          demandOption: true,
          default: false,
          describe: "Include quorum-dev-quickstart test accounts",
        },
      })
      .coerce(["consensus"], (opt: string) => {
        return opt.toLowerCase();
      }).argv;

    answers = {
      consensus: args.consensus,
      chainID: args.chainID,
      blockperiod: args.blockperiod,
      requestTimeout: args.requestTimeout,
      epochLength: args.epochLength,
      difficulty: args.difficulty,
      gasLimit: args.gasLimit,
      coinbase: args.coinbase,
      maxCodeSize: args.maxCodeSize,
      txnSizeLimit: args.txnSizeLimit,
      validators: args.validators,
      members: args.members,
      bootnodes: args.bootnodes,
      curve: args.curve,
      accountPassword: args.accountPassword,
      outputPath: args.outputPath,
      tesseraEnabled: args.tesseraEnabled,
      tesseraPassword: args.tesseraPassword,
      quickstartDevAccounts: args.quickstartDevAccounts,
    };
  } else {
    const qr = new QuestionRenderer(rootQuestion);
    answers = await qr.render(); // begin rendering the questions
    // console.log(answers); // log answer output for debugging
  }

  await generateNetworkConfig(answers as QuorumConfig); // build artifacts
  setTimeout(() => {
    process.exit(0);
  }, 500);
}

if (require.main === module) {
  // note: main returns a Promise<void>, but we don't need to do anything
  // special with it, so we use the void operator to indicate to eslint that
  // we left this dangling intentionally...
  try {
    void main();
  } catch (err: any) {
    if (
      err &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      err.stack &&
      process.argv.length >= 3 &&
      process.argv[2] === "--stackTraceOnError"
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error(`Fatal error: ${err.stack as string}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (err && err.message) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error(`Fatal error: ${err.message as string}`);
    } else if (err) {
      console.error(`Fatal error: ${err as string}`);
    } else {
      console.error(`Fatal error: unknown`);
    }
    process.exit(1);
  }
}
