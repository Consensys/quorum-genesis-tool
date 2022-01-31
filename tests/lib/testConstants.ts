
import { Consensus } from "../../src/types/consensus";
import { QuorumConfig, PrivacyConfig } from "../../src/types/quorumConfig";
import { CryptoCurve } from "../../src/types/cryptoCurve";

export const TEST_PRIVACY_CONFIG : PrivacyConfig = {
    enabled: true,
    password: "",
}

export const TEST_QUORUM_CONFIG : QuorumConfig = {
    consensus: Consensus.qbft,
    chainID: 1337,
    blockperiod: 5,
    requestTimeout: 10,
    epochLength: 30000,
    difficulty: "0x1",
    gasLimit: "0x1fffffffffffff",
    gasFreeNetwork: false,
    coinbase: "0x0000000000000000000000000000000000000000",
    maxSize: "0xff",
    txnSize: "0xff",
    validators: 4,
    members: 2,
    bootnodes: 2,
    curve: CryptoCurve.k1,
    staticnodes: true,
    permissions: true,
    privacy: TEST_PRIVACY_CONFIG,
    outputPath: "./output"
 };

 export const TEST_NODE = {
    privateKey: "865ea77fe933ba01ad4ff60b7c9187ff34be5327350c5045153e5cfa85302013",
    publicKey: "beed1b5bc414a2cc13d04d6017f9ebeec9818ba1b8c97be5776328490c69c5f0a07edc20589fa373c99aeb199d685ea177b93a4c8eb57f91304883b3d9c449ff",
    address: "3db22f82cab50038f33e33cb35a86c92f5bc18f4",
    password: ""
};
   