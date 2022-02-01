/* eslint-disable object-shorthand */
import { QuestionTree } from "../types/questions";
import { getYesNoValidator, integerValidator, outputPath } from "./common";
import * as commonQs from "./commonQs";

const _outputUserInputs: QuestionTree = commonQs.outputUserInputs;
_outputUserInputs.transformerValidator = getYesNoValidator(_outputUserInputs, outputPath, "y");

const _permissionQuestion: QuestionTree = commonQs.permissionQuestion;
_permissionQuestion.transformerValidator = getYesNoValidator(_permissionQuestion, _outputUserInputs, "y");

const _staticNodesQuestion: QuestionTree = commonQs.staticNodesQuestion;
_staticNodesQuestion.transformerValidator = getYesNoValidator(_staticNodesQuestion, _permissionQuestion, "y");

const _curveQuestion: QuestionTree = commonQs.curveQuestion;
_curveQuestion.options = [
  { label: "secp256k1", value: "k1", nextQuestion: _staticNodesQuestion, default: true },
  { label: "secp256r1", value: "r1", nextQuestion: _staticNodesQuestion }
];

const _bootnodesQuestion: QuestionTree = commonQs.bootnodesQuestion;
_bootnodesQuestion.transformerValidator = integerValidator(_bootnodesQuestion, _curveQuestion, 2);

const _membersQuestion: QuestionTree = commonQs.membersQuestion;
_membersQuestion.transformerValidator = integerValidator(_membersQuestion, _bootnodesQuestion, 1);

const _validatorsQuestion: QuestionTree = commonQs.validatorsQuestion;
_validatorsQuestion.transformerValidator = integerValidator(_validatorsQuestion, _membersQuestion, 4);

const _coinbaseQuestion: QuestionTree = commonQs.coinbaseQuestion;
_coinbaseQuestion.transformerValidator = integerValidator(_coinbaseQuestion, _validatorsQuestion);

const _gasLimitQuestion: QuestionTree = commonQs.gasLimitQuestion;
_gasLimitQuestion.transformerValidator = integerValidator(_gasLimitQuestion, _coinbaseQuestion);

const _difficultyQuestion: QuestionTree = commonQs.difficultyQuestion;
_difficultyQuestion.transformerValidator = integerValidator(_difficultyQuestion, _gasLimitQuestion, 1);

const _epochQuestion: QuestionTree = commonQs.epochQuestion;
_epochQuestion.transformerValidator = integerValidator(_epochQuestion, _difficultyQuestion);

const _blockPeriodQuestion: QuestionTree = commonQs.blockPeriodQuestion;
_blockPeriodQuestion.transformerValidator = integerValidator(_blockPeriodQuestion, _epochQuestion);

export const _chainIDQuestion: QuestionTree = commonQs.chainIDQuestion;
_chainIDQuestion.transformerValidator = integerValidator(_chainIDQuestion, _blockPeriodQuestion);
