import { QuestionTree } from "../types/questions";
import { Consensus } from "../types/consensus";
import * as ibft1 from "./ibft1Qs";
import * as ibft2 from "./ibft2Qs";
import * as qbft from "./qbftQs";
import * as clique from "./cliqueQs";
import * as raft from "./raftQs";


const bannerText = String.raw`
   ___
  / _ \  _   _   ___   _ __  _   _  _ __ ___
 | | | || | | | / _ \ | '__|| | | || '_'  _  \
 | |_| || |_| || (_) || |   | |_| || | | | | |
  \__\_\ \__,_| \___/ |_|    \__,_||_| |_| |_|

      / ___|  ___  _ __    ___  ___ (_) ___
     | |  _  / _ \| '_ \  / _ \/ __|| |/ __|
     | |_| ||  __/| | | ||  __/\__ \| |\__ \
      \____| \___||_| |_|_\___||___/|_||___/
              _____              _
             |_   _|___    ___  | |
               | | / _ \  / _ \ | |
               | || (_) || (_) || |
               |_| \___/  \___/ |_|

`;

const leadInText = `
\nWelcome to the Quorum Genesis Tool. This tool can be used
to rapidly generate genesis, account keys, and configs for Besu and GoQuorum.

To get started, be sure that you have read Besu and GoQuorum documentation regarding
genesis config options, then answer the following questions.\n\n`;

export const rootQuestion: QuestionTree = {
  name: "consensus",
  prompt: `${bannerText}${leadInText}Which consensus algorithm will you use?`,
  options: [
    { label: "IBFT1", value: Consensus.ibft, nextQuestion: ibft1._chainIDQuestion },
    { label: "IBFT2", value: Consensus.ibft2, nextQuestion: ibft2._chainIDQuestion },
    { label: "QBFT", value: Consensus.qbft, nextQuestion: qbft._chainIDQuestion },
    { label: "Clique", value: Consensus.clique, nextQuestion: clique._chainIDQuestion },
    { label: "RAFT", value: Consensus.raft, nextQuestion: raft._chainIDQuestion }
  ]
};
