import { Consensus } from "./consensus";
import { CryptoCurve } from "./cryptoCurve";

export type PrivacyConfig = {
    enabled: boolean;
    password: string;
};

export type QuorumConfig = {
    consensus: Consensus;
    chainID: number;
    blockperiod: number;
    requestTimeout: number;
    epochLength: number;
    difficulty: string;
    gasLimit: string;
    gasFreeNetwork: boolean;
    coinbase: string;
    maxSize: string;
    txnSize: string;
    validators: number;
    members: number;
    bootnodes: number;
    curve: CryptoCurve;
    staticnodes: boolean;
    permissions: boolean;
    privacy: PrivacyConfig;
    outputPath: string;
};