

export type Algorithm = {
  blockperiodseconds?: number;
  requesttimeoutseconds?: number;
  epochlength?: number;
  epoch?: number;
  policy?: number;
  period?: number;
  ceil2Nby3Block?: number;
  testQBFTBlock?: number;
};

export type CodeSize = {
  block?: number;
  size?: number;
};

export type GenesisConfig = {
  chainId: number;
  homesteadBlock: number;
  eip150Block: number;
  eip150Hash: string;
  eip155Block: number;
  eip158Block: number;
  byzantiumBlock: number;
  constantinopleBlock: number;
  isQuorum?: boolean;
  contractSizeLimit?: string;
  txnSizeLimit?: number;
  maxCodeSizeConfig?: [CodeSize];
  ibft2?: Algorithm;
  istanbul?: Algorithm;
  qbft?: Algorithm;
  clique?: Algorithm;
  ecCurve?: 'secp256k1' | 'secp256r1';
};

export type Alloc = {
  balance: string;
  comment?: string;
  privateKey?: string;
};

export type Genesis = {
  nonce: string;
  timestamp: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  'number': string;
  difficulty: string;
  coinbase: string;
  mixHash: string;
  parentHash: string;
  alloc: {
    [id: string]: Alloc;
  };
  config: GenesisConfig;
};

