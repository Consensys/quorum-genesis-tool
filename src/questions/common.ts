/* eslint-disable object-shorthand */
import { resolve as resolvePath } from "path";
import { readdirSync } from "fs";
import { QuestionTree, AnswerMap } from "../types/questions";
import chalk from "chalk";

export const outputPath: QuestionTree = {
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
      const files = readdirSync(resolvePath(answers.outputPath as string));
      if (files.length > 0) {
        console.log(chalk.red(
          `Whoops! It appears that the directory that you've chosen, ${answers.outputPath as string}\n` +
          `already contains some files. Please clear the directory before continuing, or choose\n` +
          `a different one.\n`
        ));
        return outputPath;
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
        return outputPath;
      }
    }

    // this is a no-op, but it makes the TS compiler happy :-/
    return undefined;
  }
};

export function getYesNoValidator(question: QuestionTree, nextQuestion?: QuestionTree, defaultResponse?: "y" | "n" ) {
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

export function integerValidator(question: QuestionTree, nextQuestion?: QuestionTree, defaultResponse?: number) {
  return (rawInput: string, answers: AnswerMap) => {
    const normalizedInput = parseInt(rawInput, 10);
    if (defaultResponse && isNaN(normalizedInput)) {
      answers[question.name] = defaultResponse;
      return nextQuestion;
    } else if (normalizedInput < 0 || isNaN(normalizedInput)) {
      console.log(chalk.red("Sorry, but I didn't understand your answer. Please enter a valid integer.\n"));
      return question;
    } else {
      answers[question.name] = normalizedInput;
      return nextQuestion;
    }

  };
}
