

type Algorithm = {
  blockperiodseconds?: number;
  requesttimeoutseconds?: number;
  epochlength?: number;
  epoch?: number;
  policy?: number;
  ceil2Nby3Block?: number;
  testQBFTBlock?: number;
};

type CodeSize = {
  block: number;
  size: number;
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
  isQuorum?: boolean;
  contractSizeLimit?: string;
  txnSizeLimit?: number;
  maxCodeSizeConfig?: [ CodeSize ];
  ibft2?: Algorithm;
  istanbul?: Algorithm;
  qbft?: Algorithm;
  clique?: Algorithm;
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


const DefaultGenesisConfig : GenesisConfig = {
  chainId: 1337,
  homesteadBlock: 0,
  eip150Block: 0,
  eip150Hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  eip155Block: 0,
  eip158Block: 0,
  byzantiumBlock: 0,
  constantinopleBlock: 0,
};

const DefaultAlloc : Alloc= {
  balance: "90000000000000000000000",
  comment: "test account"
};

export const DefaultCodeSize : CodeSize = {
  block: 0,
  size: 64,
};

export const DefaultGenesis : Genesis = {
  nonce : "0x0",
  timestamp: "0x58ee40ba",
  extraData: "0x0",
  gasLimit: "0xf7b760",
  gasUsed: "0x0",
  'number': "0x0",
  difficulty: "0x1",
  coinbase:"0x1",
  mixHash: "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
  parentHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  config: DefaultGenesisConfig,
  alloc: {
    "fe3b557e8fb62b89f4916b721be55ceb828dbd73": DefaultAlloc,
    "f17f52151EbEF6C7334FAD080c5704D77216b732": DefaultAlloc,
    "627306090abaB3A6e1400e9345bC60c78a8BEf57": DefaultAlloc,
  }
};


