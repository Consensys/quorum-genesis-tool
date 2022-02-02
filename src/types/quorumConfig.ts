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
    coinbase?: string;
    maxCodeSize?: number;
    txnSizeLimit?: number;
    validators: number;
    members: number;
    bootnodes: number;
    curve: CryptoCurve;
    staticnodes: boolean;
    permissions: boolean;
    accountPassword: string;
    outputPath: string;
};
