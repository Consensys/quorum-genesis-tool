

import { Consensus } from "../types/consensus";
import { QuorumConfig } from "../types/quorumConfig";
import { BesuGenesis, DefaultBesuGenesis } from "../types/genesis";
import fs from "fs";

const BESU_GENESIS_FILE="genesisBesu.json";

export function updateBesuGenesis(path: string, quorumConfig: QuorumConfig, extraData: string) : string {
  const genesisFile = path + '/' + BESU_GENESIS_FILE;
  const besu : BesuGenesis = DefaultBesuGenesis ;
  besu.extraData = extraData;
  besu.gasLimit = quorumConfig.gasLimit;
  besu.config.chainId = quorumConfig.chainID;
  const consensus = quorumConfig.consensus;
  switch(consensus) {
    case Consensus.clique: {
        besu.config.clique = {
          blockperiodseconds : quorumConfig.blockperiod,
          epochlength : quorumConfig.epochLength,
          requesttimeoutseconds : quorumConfig.requestTimeout,
        };
      break;
    }
    case Consensus.ibft2: {
      besu.config.ibft2 = {
        blockperiodseconds : quorumConfig.blockperiod,
        epochlength : quorumConfig.epochLength,
        requesttimeoutseconds : quorumConfig.requestTimeout,
      };
      break;
    }
    // qbft
    default: {
      besu.config.qbft = {
        blockperiodseconds : quorumConfig.blockperiod,
        epochlength : quorumConfig.epochLength,
        requesttimeoutseconds : quorumConfig.requestTimeout,
      };
      break;
    }
  }
  fs.writeFileSync(genesisFile, JSON.stringify(besu, null, 2));
  return genesisFile;
}