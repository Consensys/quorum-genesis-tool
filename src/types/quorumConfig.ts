import { Consensus } from "./consensus";
import { CryptoCurve } from "./cryptoCurve";

export type QuorumConfig = {
  consensus: Consensus;
  chainID: number;
  emptyBlockPeriod: number;
  blockperiod: number;
  requestTimeout: number;
  epochLength: number;
  difficulty: number;
  gasLimit: string;
  coinbase: string;
  maxCodeSize?: number;
  txnSizeLimit?: number;
  validators: number;
  members: number;
  bootnodes: number;
  curve: CryptoCurve;
  accountPassword: string;
  outputPath: string;
  tesseraEnabled: boolean;
  tesseraPassword: string;
  quickstartDevAccounts: boolean;
  noOutputTimestamp: boolean;
};
