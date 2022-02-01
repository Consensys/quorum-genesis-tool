

// import { Consensus } from "../types/consensus";
// import { QuorumConfig } from "../types/quorumConfig";
// import fse from "fs-extra";
// import { BesuGenesis } from "../types/genesis";

// const BESU_GENESIS_FILE="genesisBesu.json";

// export function updateBesuGenesis(path: string, quorumConfig: QuorumConfig, extraData: string) : void {
//   const genesisFile = path + '/genesis/' + BESU_GENESIS_FILE;
//   const besu : BesuGenesis = JSON.parse(fse.readFileSync(genesisFile, 'utf8'));
//   besu.extraData = extraData;
//   besu.gasLimit = quorumConfig.gasLimit;
//   besu.config.chainId = quorumConfig.chainID;

//   const consensus = quorumConfig.consensus;
//   switch(consensus) {
//     case Consensus.clique: {
//         besu.config.clique = {
//           blockperiodseconds : quorumConfig.blockperiod,
//           epochlength : quorumConfig.epochLength,
//           requesttimeoutseconds : quorumConfig.requestTimeout,
//         };
//       break;
//     }
//     case Consensus.ibft2: {
//       besu.config.ibft2 = {
//         blockperiodseconds : quorumConfig.blockperiod,
//         epochlength : quorumConfig.epochLength,
//         requesttimeoutseconds : quorumConfig.requestTimeout,
//       };
//       break;
//     }
//     // qbft
//     default: {
//       besu.config.qbft = {
//         blockperiodseconds : quorumConfig.blockperiod,
//         epochlength : quorumConfig.epochLength,
//         requesttimeoutseconds : quorumConfig.requestTimeout,
//       };
//       break;
//     }
//   }
//   fse.writeFileSync(genesisFile, JSON.stringify(besu, null, 2));
// }