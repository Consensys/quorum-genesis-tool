import { Consensus } from "./consensus";
import { CryptoCurve } from "./cryptoCurve";

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
    privacy: boolean;
    privacyPassword: string;
    outputPath: string;
};