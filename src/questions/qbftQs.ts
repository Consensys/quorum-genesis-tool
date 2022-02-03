// import { CryptoCurve } from "../types/cryptoCurve";
import { QuestionTree } from "../types/questions";
import { integerValidator, passwordValidator, stringValidator } from "./common";
import * as commonQs from "./commonQs";

const _accountPasswordQuestion: QuestionTree = Object.assign({}, commonQs.accountPasswordQuestion);
_accountPasswordQuestion.transformerValidator = passwordValidator(_accountPasswordQuestion, undefined);

// const _curveQuestion: QuestionTree = Object.assign({}, commonQs.curveQuestion);
// _curveQuestion.options = [
//   { label: "secp256k1", value: CryptoCurve.k1, nextQuestion: _accountPasswordQuestion, default: true },
//   { label: "secp256r1", value: CryptoCurve.r1, nextQuestion: _accountPasswordQuestion }
// ];

const _bootnodesQuestion: QuestionTree = Object.assign({}, commonQs.bootnodesQuestion);
_bootnodesQuestion.transformerValidator = integerValidator(_bootnodesQuestion, _accountPasswordQuestion, 2);

const _membersQuestion: QuestionTree = Object.assign({}, commonQs.membersQuestion);
_membersQuestion.transformerValidator = integerValidator(_membersQuestion, _bootnodesQuestion, 1);

const _validatorsQuestion: QuestionTree = Object.assign({}, commonQs.validatorsQuestion);
_validatorsQuestion.transformerValidator = integerValidator(_validatorsQuestion, _membersQuestion, 4);

const _txnSizeLimitQuestion: QuestionTree = Object.assign({}, commonQs.txnSizeLimitQuestion);
_txnSizeLimitQuestion.transformerValidator = integerValidator(_txnSizeLimitQuestion, _validatorsQuestion, 64);

const _maxCodeSizeQuestion: QuestionTree = Object.assign({}, commonQs.maxCodeSizeQuestion);
_maxCodeSizeQuestion.transformerValidator = integerValidator(_maxCodeSizeQuestion, _txnSizeLimitQuestion, 64);

const _coinbaseQuestion: QuestionTree = Object.assign({}, commonQs.coinbaseQuestion);
_coinbaseQuestion.transformerValidator = stringValidator(_coinbaseQuestion, _maxCodeSizeQuestion, "0x0000000000000000000000000000000000000000");

const _gasLimitQuestion: QuestionTree = Object.assign({}, commonQs.gasLimitQuestion);
_gasLimitQuestion.transformerValidator = stringValidator(_gasLimitQuestion, _coinbaseQuestion, "0xffff");

const _difficultyQuestion: QuestionTree = Object.assign({}, commonQs.difficultyQuestion);
_difficultyQuestion.transformerValidator = integerValidator(_difficultyQuestion, _gasLimitQuestion, 1);

const _epochQuestion: QuestionTree = Object.assign({}, commonQs.epochQuestion);
_epochQuestion.transformerValidator = integerValidator(_epochQuestion, _difficultyQuestion, 30000);

const _requestTimeoutQuestion: QuestionTree = Object.assign({}, commonQs.requestTimeoutQuestion);
_requestTimeoutQuestion.transformerValidator = integerValidator(_requestTimeoutQuestion, _epochQuestion, 10);

const _blockPeriodQuestion: QuestionTree = Object.assign({}, commonQs.blockPeriodQuestion);
_blockPeriodQuestion.transformerValidator = integerValidator(_blockPeriodQuestion, _requestTimeoutQuestion, 5);

export const _chainIDQuestion: QuestionTree = Object.assign({}, commonQs.chainIDQuestion);
_chainIDQuestion.transformerValidator = integerValidator(_chainIDQuestion, _blockPeriodQuestion, 1337);
