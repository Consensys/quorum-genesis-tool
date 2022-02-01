

type Algorithm = {
  blockperiodseconds: number;
  epochlength: number;
  requesttimeoutseconds: number;
  policy?: number;
  ceil2Nby3Block?: number;
};

type GenesisConfig = {
  chainId: number;
  homesteadBlock: number;
  eip150Block: number;
  eip150Hash: string;
  eip155Block: number;
  eip158Block: number;
  byzantiumBlock: number;
  constantinopleBlock: number;
  contractSizeLimit?: string;
  ibft2?: Algorithm;
  qbft?: Algorithm;
  clique?: Algorithm;
};

export type Alloc = {
  balance: string;
  comment?: string;
  privateKey?: string;
};

export type BesuGenesis = {
  nonce: string;
  timestamp: string;
  extraData: string;
  gasLimit: string;
  difficulty: string;
  mixHash: string;
  coinbase: string;
  'number': string;
  gasUsed: string;
  parentHash: string;
  alloc: {
    [id: string]: Alloc;
  };
  config: GenesisConfig;
};



