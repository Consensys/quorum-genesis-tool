import { resolve as resolvePath } from "path";
import { readdirSync } from "fs";
import { QuestionTree, AnswerMap } from "./types";
import chalk from "chalk";

const _outputDirQuestion: QuestionTree = {
  name: "outputPath",
  prompt: "Where should we create the config files for this network? Please\n" +
"choose either an empty directory, or a path to a new directory that does\n" +
  "not yet exist. Default: ./genesis-config-files",
  transformerValidator: (rawInput: string, answers: AnswerMap) => {
    // TODO: add some more checks to make sure that the path is valid
    if (rawInput) {
      answers.outputPath = rawInput;
    } else {
      answers.outputPath = "./genesis-config-files";
    }

    try {
      const files = readdirSync(resolvePath(answers.outputPath));
      if (files.length > 0) {
        console.log(chalk.red(
          `Whoops! It appears that the directory that you've chosen, ${answers.outputPath as string}\n` +
          `already contains some files. Please clear the directory before continuing, or choose\n` +
          `a different one.\n`
        ));
        return _outputDirQuestion;
      }
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err.code as string === "ENOENT") {
        return undefined;
      } else {
        console.log(chalk.red(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Whoops! There was an error when checking your output directory (${err.code as string}). Please\n` +
          `choose a different one before proceeding.\n`
        ));
        return _outputDirQuestion;
      }
    }

    // this is a no-op, but it makes the TS compiler happy :-/
    return undefined;
  }
};

const _tesseraQuestion: QuestionTree = {
  name: "tessera",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_tesseraQuestion.transformerValidator = _getYesNoValidator(_tesseraQuestion, _outputDirQuestion);

const _permissionQuestion: QuestionTree = {
  name: "permissions",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_permissionQuestion.transformerValidator = _getYesNoValidator(_permissionQuestion, _tesseraQuestion);

const _staticNodesQuestion: QuestionTree = {
  name: "staticnodes",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_staticNodesQuestion.transformerValidator = _getYesNoValidator(_staticNodesQuestion, _permissionQuestion);

const _curveQuestion: QuestionTree = {
  name: "curve",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
  options: [
    { label: "secp256k1", value: "k1", nextQuestion: _staticNodesQuestion },
    { label: "secp256r1", value: "r1", nextQuestion: _staticNodesQuestion }
  ]
};

const _bootnodesQuestion: QuestionTree = {
  name: "bootnodes",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_bootnodesQuestion.transformerValidator = _integerValidator(_bootnodesQuestion, _curveQuestion);

const _membersQuestion: QuestionTree = {
  name: "members",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_membersQuestion.transformerValidator = _integerValidator(_membersQuestion, _bootnodesQuestion);

const _validatorsQuestion: QuestionTree = {
  name: "validators",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_validatorsQuestion.transformerValidator = _integerValidator(_validatorsQuestion, _membersQuestion);

const _txnSizeLimitQuestion: QuestionTree = {
  name: "txnsize",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_txnSizeLimitQuestion.transformerValidator = _integerValidator(_txnSizeLimitQuestion, _validatorsQuestion);

const _maxCodeSizeQuestion: QuestionTree = {
  name: "maxsize",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_maxCodeSizeQuestion.transformerValidator = _integerValidator(_maxCodeSizeQuestion, _txnSizeLimitQuestion);

const _coinbaseQuestion: QuestionTree = {
  name: "coinbase",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_coinbaseQuestion.transformerValidator = _integerValidator(_coinbaseQuestion, _maxCodeSizeQuestion);

const _gasLimitQuestion: QuestionTree = {
  name: "gaslimit",
  prompt: "Do you wish to enable support for logging with Splunk or ELK (Elasticsearch, Logstash & Kibana)? Default: [1]",
};
_gasLimitQuestion.transformerValidator = _integerValidator(_gasLimitQuestion, _coinbaseQuestion);

const _difficultyQuestion: QuestionTree = {
  name: "difficulty",
  prompt: "Set your difficulty: (integer) Default: 1",
};
_difficultyQuestion.transformerValidator = _integerValidator(_difficultyQuestion, _gasLimitQuestion, 1);

const _epochQuestion: QuestionTree = {
  name: "epochlength",
  prompt: "Set your epoch length value: (integer)",
};
_epochQuestion.transformerValidator = _integerValidator(_epochQuestion, _difficultyQuestion);

const _requestTimeoutQuestion: QuestionTree = {
  name: "requesttimeout",
  prompt: "Set your requestTimeoutSeconds value: (integer)",
};
_requestTimeoutQuestion.transformerValidator = _integerValidator(_requestTimeoutQuestion, _epochQuestion);


const _blockPeriodQuestion: QuestionTree = {
  name: "blockperiod",
  prompt: "Set your blockperiodseconds value: (integer)",
};
_blockPeriodQuestion.transformerValidator = _integerValidator(_blockPeriodQuestion, _requestTimeoutQuestion);


const _chainIDQuestion: QuestionTree = {
  name: "chainID",
  prompt: "Set your chainID value: (integer)",
};
_chainIDQuestion.transformerValidator = _integerValidator(_chainIDQuestion, _blockPeriodQuestion);

function _getYesNoValidator(question: QuestionTree, nextQuestion?: QuestionTree, defaultResponse?: "y" | "n" ) {
  return (rawInput: string, answers: AnswerMap) => {
    const normalizedInput = rawInput.toLowerCase();

    if (defaultResponse && !normalizedInput) {
      answers[question.name] = defaultResponse === "y";
      return nextQuestion;
    } else if (normalizedInput === "y" || normalizedInput === "n") {
      answers[question.name] = normalizedInput === "y";
      return nextQuestion;
    } else {
      console.log(chalk.red("Sorry, but I didn't understand your answer. Please select Y or N,\n" +
          "or just hit enter if you want the default.\n"));
      return question;
    }
  };
}

function _integerValidator(question: QuestionTree, nextQuestion?: QuestionTree, defaultResponse?: Number) {
  return (rawInput: string, answers: AnswerMap) => {
    const normalizedInput = parseInt(rawInput)
    if (defaultResponse && isNaN(normalizedInput)) {
      answers[question.name] = defaultResponse;
      return nextQuestion;
    } else if (isNaN(normalizedInput)) {
      console.log(chalk.red("Sorry, but I didn't understand your answer. Please enter a valid integer.\n"));
      return question;
    } else {
      answers[question.name] = normalizedInput;
      return nextQuestion;
    }

  }
}

// function _hexValidator(question: QuestionTree, nextQuestion?: QuestionTree) {
//   return (rawInput: string, answers: AnswerMap) => {
//     const normalizedInput = Buffer.from(rawInput, 'hex')
//     if (isNaN(normalizedInput)) { // parseInt will return NaN if string cannot be converted to int
//       console.log(chalk.red("Sorry, but I didn't understand your answer. Please enter a valid integer.\n"));
//       return question;
//     } else if (Number.isInteger(normalizedInput)) {
//       answers.chainID = normalizedInput;
//       return nextQuestion;
//     } else { // return the Q again if we somehow get here
//       return question;
//     }
//   }
// }

const bannerText = String.raw`
   ___                                        
  / _ \  _   _   ___   _ __  _   _  _ __ ___  
 | | | || | | | / _ \ | '__|| | | || '_'  _ \ 
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
  name: "consensusAlgo",
  prompt: `${bannerText}${leadInText}Which consensus algorithm will you use?`,
  options: [
      { label: "IBFT1", value: "ibft1", nextQuestion: _chainIDQuestion },
      { label: "IBFT2", value: "ibft2", nextQuestion: _chainIDQuestion },
      { label: "QBFT", value: "qbft", nextQuestion: _chainIDQuestion },
      { label: "Clique", value: "clique", nextQuestion: _chainIDQuestion },
      { label: "RAFT", value: "raft", nextQuestion: _chainIDQuestion }
  ]
};