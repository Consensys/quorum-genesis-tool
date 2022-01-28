
import { EthAccount, NodeKeys } from "../../src/types/nodeKeys";
import * as nodekeys from "../../src/util/nodeKeys";

const testNode = {
 privateKey: "865ea77fe933ba01ad4ff60b7c9187ff34be5327350c5045153e5cfa85302013",
 publicKey: "beed1b5bc414a2cc13d04d6017f9ebeec9818ba1b8c97be5776328490c69c5f0a07edc20589fa373c99aeb199d685ea177b93a4c8eb57f91304883b3d9c449ff",
 address: "3db22f82cab50038f33e33cb35a86c92f5bc18f4",
 password: ""
};

describe("NodeKeys generation", () => {

  it("should create a new private key", () => {
    const priv : Buffer = nodekeys.generatePrivateKey();
    expect(priv).not.toBe(null);
  });

  it("should create a pubkey from a known private key", () => {
    const priv : Buffer = Buffer.from(testNode.privateKey, 'hex');
    const pubKey : Buffer = nodekeys.derivePublicKey(priv);
    expect(pubKey.toString('hex')).toBe(testNode.publicKey);
  });

  it("should create an address from a known private key", () => {
    const priv : Buffer = Buffer.from(testNode.privateKey, 'hex');
    const pubKey : Buffer = nodekeys.derivePublicKey(priv);
    const address : Buffer = nodekeys.deriveAddress(pubKey);
    expect(address.toString('hex')).toBe(testNode.address);
  });

  it("should generate an account key", async () => {
    const account : EthAccount = await nodekeys.generateEthAccount(testNode.password);
    expect(account).not.toBe(null);
  });

  it("should generate an object with nodekeys and account keys", async () => {
    const nodeKeys : NodeKeys = await nodekeys.generateNodeKeys(testNode.password);
    console.log(nodeKeys);
    expect(nodeKeys).not.toBe(null);
  });

});

