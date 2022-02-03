

import { Consensus } from "../types/consensus";
import { QuorumConfig } from "../types/quorumConfig";
import { Genesis, GenesisConfig, Alloc, CodeSize } from "../types/genesis";
import fs from "fs";

const BESU_GENESIS_FILE = "genesisBesu.json";
const GOQUORUM_GENESIS_FILE = "genesisGoQuorum.json";
const GOQ_SUB = "/goquorum";
const BESU_SUB = "/besu";


function createDefaultGenesis(): Genesis {
  const DefaultAlloc: Alloc = {
    balance: "90000000000000000000000",
    comment: "test account"
  };

  const DefaultGenesisConfig: GenesisConfig = {
    chainId: 1337,
    homesteadBlock: 0,
    eip150Block: 0,
    eip150Hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    eip155Block: 0,
    eip158Block: 0,
    byzantiumBlock: 0,
    constantinopleBlock: 0,
  };

  const genesis: Genesis = {
    nonce: "0x0",
    timestamp: "0x58ee40ba",
    extraData: "0x0",
    gasLimit: "0xf7b760",
    gasUsed: "0x0",
    'number': "0x0",
    difficulty: "0x1",
    coinbase: "0x1",
    mixHash: "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
    parentHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    config: DefaultGenesisConfig,
    alloc: {
      "fe3b557e8fb62b89f4916b721be55ceb828dbd73": DefaultAlloc,
      "f17f52151EbEF6C7334FAD080c5704D77216b732": DefaultAlloc,
      "627306090abaB3A6e1400e9345bC60c78a8BEf57": DefaultAlloc,
    }
  };

  return genesis;
}

export function createBesuGenesis(path: string, quorumConfig: QuorumConfig, extraData: string): string {
  const genesisFile = path + BESU_SUB + '/' + BESU_GENESIS_FILE;
  const besu: Genesis = createDefaultGenesis();
  besu.extraData = extraData;
  besu.gasLimit = quorumConfig.gasLimit;
  besu.coinbase = quorumConfig.coinbase;
  besu.difficulty = quorumConfig.difficulty.toString(16);
  besu.config.chainId = quorumConfig.chainID;
  const consensus = quorumConfig.consensus;
  switch (consensus) {
    case Consensus.clique: {
      besu.config.clique = {
        blockperiodseconds: quorumConfig.blockperiod,
        epochlength: quorumConfig.epochLength,
        requesttimeoutseconds: quorumConfig.requestTimeout,
      };
      break;
    }
    case Consensus.ibft2: {
      besu.config.ibft2 = {
        blockperiodseconds: quorumConfig.blockperiod,
        epochlength: quorumConfig.epochLength,
        requesttimeoutseconds: quorumConfig.requestTimeout,
      };
      break;
    }
    case Consensus.qbft: {
      besu.config.qbft = {
        blockperiodseconds: quorumConfig.blockperiod,
        epochlength: quorumConfig.epochLength,
        requesttimeoutseconds: quorumConfig.requestTimeout,
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

export function createGoQuorumGenesis(path: string, quorumConfig: QuorumConfig, extraData: string): string {
  const DefaultCodeSize: CodeSize = {
    block: 0,
    size: quorumConfig.maxCodeSize,
  };

  const genesisFile = path + GOQ_SUB + '/' + GOQUORUM_GENESIS_FILE;
  const goquorum: Genesis = createDefaultGenesis();
  goquorum.extraData = extraData;
  goquorum.gasLimit = quorumConfig.gasLimit;
  goquorum.coinbase = quorumConfig.coinbase;
  goquorum.difficulty = '0x' + quorumConfig.difficulty.toString(16);
  goquorum.config.isQuorum = true;
  goquorum.config.chainId = quorumConfig.chainID;
  goquorum.config.maxCodeSizeConfig = [DefaultCodeSize];
  goquorum.config.txnSizeLimit = quorumConfig.txnSizeLimit;

  const consensus = quorumConfig.consensus;
  switch (consensus) {
    case Consensus.clique: {
      goquorum.config.clique = {
        policy: 0,
        epoch: quorumConfig.epochLength
      };
      break;
    }
    case Consensus.ibft: {
      goquorum.config.istanbul = {
        policy: 0,
        epoch: quorumConfig.epochLength,
        ceil2Nby3Block: 0
      };
      break;
    }
    case Consensus.qbft: {
      goquorum.config.istanbul = {
        policy: 0,
        epoch: quorumConfig.epochLength,
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
