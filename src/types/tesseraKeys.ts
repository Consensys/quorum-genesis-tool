export type PrivateKey = Uint8Array | Buffer;
export type PublicKey = Uint8Array | Buffer;

export interface TesseraKeys {
  secretKey: PrivateKey;
  publicKey: PublicKey;
}

export interface unlockedBytes {
  bytes: string;
}

export interface lockedInfo {
  snonce: string;
  asalt: string;
  sbox: string;
  aopts: {
    variant: "i" | "2d" | "2id";
    iterations: number;
    memory: number;
    parallelism: number;
  };
}

export interface OUTPUT_KEY_UNLOCK {
  type: string;
  data: unlockedBytes;
}

export interface OUTPUT_KEY_LOCK {
  type: string;
  data: lockedInfo;
}
