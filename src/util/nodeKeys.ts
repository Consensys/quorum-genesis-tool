
import secp256k1 from "secp256k1";
// import secp256r1 from "secp256r1";
import keccak from "keccak";
import { randomBytes } from "crypto";
import { Address, NodeKeys, PrivateKey, PublicKey, EthAccount } from "../types/nodeKeys";
import Wallet from "ethereumjs-wallet";

export function generatePrivateKey() : PrivateKey {
  let privKey : PrivateKey;
  do {
    privKey = randomBytes(32);
  } while ( !secp256k1.privateKeyVerify(privKey) );
  return privKey;
}

export function derivePublicKey(privKey: Buffer): PublicKey {
  // slice on the end to remove the compression prefix ie. uncompressed use 04 prefix & compressed use 02 or 03
  // we generate the address, which wont work with the compression prefix
  const pubKey : Uint8Array = secp256k1.publicKeyCreate(privKey, false).slice(1);
  return Buffer.from(pubKey);
}

export function deriveAddress(pubKey: Uint8Array) : Address  {
  if(!Buffer.isBuffer(pubKey)) {
    console.log("ERROR - pubKey is not a buffer");
    process.exit();
  }
  const keyHash : Address = keccak('keccak256').update(pubKey).digest();
  return keyHash.slice(Math.max(keyHash.length - 20, 1));
}

export async function generateEthAccount(password: string) : Promise<EthAccount> {
  const wallet : Wallet = Wallet.generate();
  const v3keystore = await wallet.toV3(password);
  const ethAccount : EthAccount = {
    privateKey: wallet.getPrivateKeyString(),
    publicKey: wallet.getPublicKeyString(),
    address: wallet.getAddressString(),
    keystore: JSON.stringify(v3keystore),
    password
  };
  return ethAccount;
}

export async function generateNodeKeys(password: string) : Promise<NodeKeys> {
  const privateKey : PrivateKey = generatePrivateKey();
  const publicKey : PublicKey = derivePublicKey(privateKey);
  const address : Address = deriveAddress(publicKey);
  const ethAccount : EthAccount = await generateEthAccount(password);
  const nodeKeys : NodeKeys = {
    privateKey,
    publicKey,
    address,
    ethAccount
  };
  return nodeKeys;
}
