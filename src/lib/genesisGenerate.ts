import { Consensus } from "../types/consensus";
import { QuorumConfig } from "../types/quorumConfig";
import { Genesis, GenesisConfig, CodeSize, Alloc } from "../types/genesis";
import fs from "fs";
import { CryptoCurve } from "../types/cryptoCurve";
import { NodeKeys } from "../types/nodeKeys";

const GENESIS_FILE = "genesis.json";
const GOQ_SUB = "/goQuorum";
const BESU_SUB = "/besu";

function createDefaultGenesis(): Genesis {
  const DefaultAlloc: Alloc = {
    balance: "90000000000000000000000",
    comment:
      "test account from quorum-dev-quickstart -- please remove me before entering production",
  };

  const DefaultGenesisConfig: GenesisConfig = {
    chainId: 1337,
    homesteadBlock: 0,
    eip150Block: 0,
    eip150Hash:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    eip155Block: 0,
    eip158Block: 0,
    byzantiumBlock: 0,
    constantinopleBlock: 0,
    petersburgBlock: 0,
    istanbulBlock: 0,
    muirglacierblock: 0,
    berlinBlock: 0,
    londonBlock: 0,
  };

  const genesis: Genesis = {
    nonce: "0x0",
    timestamp: "0x58ee40ba",
    extraData: "0x0",
    gasLimit: "0xf7b760",
    gasUsed: "0x0",
    // eslint-disable-next-line id-blacklist
    number: "0x0",
    difficulty: "0x1",
    coinbase: "0x1",
    mixHash:
      "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
    parentHash:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    config: DefaultGenesisConfig,
    alloc: {
      fe3b557e8fb62b89f4916b721be55ceb828dbd73: DefaultAlloc,
      f17f52151EbEF6C7334FAD080c5704D77216b732: DefaultAlloc,
      "627306090abaB3A6e1400e9345bC60c78a8BEf57": DefaultAlloc,
    },
  };
  return genesis;
}

export function createBesuGenesis(
  path: string,
  quorumConfig: QuorumConfig,
  extraData: string,
  node: NodeKeys[]
): string {
  const genesisFile = path + BESU_SUB + "/" + GENESIS_FILE;
  const besu: Genesis = createDefaultGenesis();
  besu.extraData = extraData;
  besu.gasLimit = quorumConfig.gasLimit;
  besu.coinbase = quorumConfig.coinbase;
  besu.difficulty = "0x" + quorumConfig.difficulty.toString(16);
  besu.config.chainId = quorumConfig.chainID;
  const consensus = quorumConfig.consensus;
  if (quorumConfig.curve === CryptoCurve.r1) {
    besu.config.ecCurve = "secp256r1";
  }
  if (quorumConfig.quickstartDevAccounts === false) {
    besu.alloc = {};
  }
  node.forEach((account) => {
    besu.alloc[account.ethAccount.address] = {
      balance: "1000000000000000000000000000",
    };
  });

  if (quorumConfig.prefundedAccounts) {
    const prefundedAccounts = JSON.parse(quorumConfig.prefundedAccounts) as {
      [key: string]: { balance: string };
    };
    Object.entries(prefundedAccounts).forEach(([key, value]) => {
      besu.alloc[key] = {
        balance: value.balance,
      };
    });
  }
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

export function createGoQuorumGenesis(
  path: string,
  quorumConfig: QuorumConfig,
  extraData: string,
  node: NodeKeys[]
): string {
  const DefaultCodeSize: CodeSize = {
    block: 0,
    size: quorumConfig.maxCodeSize,
  };

  const genesisFile = path + GOQ_SUB + "/" + GENESIS_FILE;
  const goquorum: Genesis = createDefaultGenesis();
  goquorum.extraData = extraData;
  goquorum.gasLimit = quorumConfig.gasLimit;
  goquorum.coinbase = quorumConfig.coinbase;
  goquorum.difficulty = "0x" + quorumConfig.difficulty.toString(16);
  goquorum.config.isQuorum = true;
  goquorum.config.chainId = quorumConfig.chainID;
  goquorum.config.maxCodeSizeConfig = [DefaultCodeSize];
  goquorum.config.txnSizeLimit = quorumConfig.txnSizeLimit;
  if (quorumConfig.quickstartDevAccounts === false) {
    goquorum.alloc = {};
  }
  node.forEach((account) => {
    goquorum.alloc[account.ethAccount.address] = {
      balance: "1000000000000000000000000000",
    };
  });

  if (quorumConfig.prefundedAccounts) {
    const prefundedAccounts = JSON.parse(quorumConfig.prefundedAccounts) as {
      [key: string]: { balance: string };
    };
    Object.entries(prefundedAccounts).forEach(([key, value]) => {
      goquorum.alloc[key] = {
        balance: value.balance,
      };
    });
  }

  const consensus = quorumConfig.consensus;
  switch (consensus) {
    case Consensus.clique: {
      goquorum.config.clique = {
        policy: 0,
        period: quorumConfig.blockperiod,
        epoch: quorumConfig.epochLength,
      };
      break;
    }
    case Consensus.ibft: {
      goquorum.config.ibft = {
        policy: 0,
        epoch: quorumConfig.epochLength,
        ceil2Nby3Block: 0,
        blockperiodseconds: quorumConfig.blockperiod,
        requesttimeoutseconds: quorumConfig.requestTimeout,
      };
      break;
    }
    case Consensus.qbft: {
      goquorum.config.qbft = {
        policy: 0,
        epoch: quorumConfig.epochLength,
        ceil2Nby3Block: 0,
        testQBFTBlock: 0,
        blockperiodseconds: quorumConfig.blockperiod,
        emptyblockperiodseconds: quorumConfig.emptyBlockPeriod,
        requesttimeoutseconds: quorumConfig.requestTimeout,
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
