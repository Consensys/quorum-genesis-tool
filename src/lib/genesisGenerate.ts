

import { Consensus } from "../types/consensus";
import { QuorumConfig } from "../types/quorumConfig";
import { Genesis, DefaultGenesis, DefaultCodeSize } from "../types/genesis";
import fs from "fs";

const BESU_GENESIS_FILE="genesisBesu.json";
const GOQUORUM_GENESIS_FILE="genesisGoQuorum.json";

export function createBesuGenesis(path: string, quorumConfig: QuorumConfig, extraData: string) : string {
  const genesisFile = path + '/' + BESU_GENESIS_FILE;
  let besu : Genesis = DefaultGenesis ;
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
    case Consensus.qbft: {
      besu.config.qbft = {
        blockperiodseconds : quorumConfig.blockperiod,
        epochlength : quorumConfig.epochLength,
        requesttimeoutseconds : quorumConfig.requestTimeout,
      };
      break;
    }
    default: {
      break;
    }
  }
  fs.writeFileSync(genesisFile, JSON.stringify(besu, null, 2));
  return genesisFile;
}

export function createGoQuorumGenesis(path: string, quorumConfig: QuorumConfig, extraData: string) : string {
  const genesisFile = path + '/' + GOQUORUM_GENESIS_FILE;
  let goquorum : Genesis = DefaultGenesis ;
  console.log("**********************");
  console.log(goquorum);
  console.log("**********************");
  goquorum.extraData = extraData;
  goquorum.gasLimit = quorumConfig.gasLimit;
  goquorum.config.chainId = quorumConfig.chainID;
  goquorum.config.isQuorum = true;
  goquorum.config.maxCodeSizeConfig = [ DefaultCodeSize ];
  goquorum.config.maxCodeSizeConfig[0].size = quorumConfig.maxCodeSize;
  goquorum.config.txnSizeLimit = quorumConfig.txnSizeLimit;

  const consensus = quorumConfig.consensus;

  switch(consensus) {
    // TODO: check this for clique
    case Consensus.clique: {
      goquorum.config.clique = {
          blockperiodseconds : quorumConfig.blockperiod,
          epochlength : quorumConfig.epochLength,
          requesttimeoutseconds : quorumConfig.requestTimeout,
        };
      break;
    }
    case Consensus.ibft: {
      goquorum.config.istanbul = {
        policy: 0,
        epoch : quorumConfig.epochLength,
        ceil2Nby3Block: 0
      };
      break;
    }
    case Consensus.qbft: {
      goquorum.config.istanbul = {
        policy: 0,
        epoch : quorumConfig.epochLength,
        ceil2Nby3Block: 0,
        testQBFTBlock: 0,
      };
      break;
    }
    case Consensus.raft: {
      // raft = no block so ignoring
     break;
    }
    default: {
      break;
    }
  }
  fs.writeFileSync(genesisFile, JSON.stringify(goquorum, null, 2));
  return genesisFile;
}