

export type PrivateKey = Buffer;

export type PublicKey = Buffer;

export type Address = Buffer;

export type EthAccount = {
  privateKey: string;
  publicKey: string;
  address: string;
  keystore: string;
  password: string;
};

export type NodeKeys = {
  privateKey: PrivateKey;
  publicKey: PublicKey;
  address: Address;
  ethAccount: EthAccount;
};


