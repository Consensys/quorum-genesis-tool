
import { TEST_NODE } from "./testConstants"
import { EthAccount, NodeKeys } from "../../src/types/nodeKeys";
import * as nodekeys from "../../src/lib/nodeKeys";

describe("NodeKeys generation", () => {

  it("should create a new private key", () => {
    const priv : Buffer = nodekeys.generatePrivateKey();
    expect(priv).not.toBe(null);
  });

  it("should create a pubkey from a known private key", () => {
    const priv : Buffer = Buffer.from(TEST_NODE.privateKey, 'hex');
    const pubKey : Buffer = nodekeys.derivePublicKey(priv);
    expect(pubKey.toString('hex')).toBe(TEST_NODE.publicKey);
  });

  it("should create an address from a known private key", () => {
    const priv : Buffer = Buffer.from(TEST_NODE.privateKey, 'hex');
    const pubKey : Buffer = nodekeys.derivePublicKey(priv);
    const address : Buffer = nodekeys.deriveAddress(pubKey);
    expect(address.toString('hex')).toBe(TEST_NODE.address);
  });

  it("should generate an account key", async () => {
    const account : EthAccount = await nodekeys.generateEthAccount(TEST_NODE.password);
    expect(account).not.toBe(null);
  });

  it("should generate an object with nodekeys and account keys", async () => {
    const nodeKeys : NodeKeys = await nodekeys.generateNodeKeys(TEST_NODE.password, TEST_NODE.curve);
    expect(nodeKeys).not.toBe(null);
  });

});

