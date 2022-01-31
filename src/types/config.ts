export interface ConfigContext {
  consensusAlgo: "ibft1" | "ibft2" | "qbft" | "clique" | "raft";
  chainID: number;
  blockperiod: boolean;
  requesttimeout: number;
  epochlength: number;
  difficulty: number;
  gaslimit: number;
  coinbase: number; // maybe take string of hex?
  maxsize: number;
  txnsize: number;
  validators: number;
  members: number;
  bootnodes: number;
  curve: "k1" | "r1";
  staticnodes: boolean;
  permissions: boolean;
  tessera: boolean;
  userinput: boolean;
  outputPath: string;
}
