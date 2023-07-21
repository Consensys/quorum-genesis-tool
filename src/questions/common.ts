import { Alloc } from "../types";
import { QuestionTree, AnswerMap } from "../types/questions";
import chalk from "chalk";

export function getYesNoValidator(
  question: QuestionTree,
  nextQuestion?: QuestionTree,
  defaultResponse?: "y" | "n"
) {
  return (rawInput: string, answers: AnswerMap) => {
    const normalizedInput = rawInput.toLowerCase();
    if (defaultResponse && !normalizedInput) {
      answers[question.name] = defaultResponse === "y";
      return nextQuestion;
    } else if (normalizedInput === "y" || normalizedInput === "n") {
      answers[question.name] = normalizedInput === "y";
      return nextQuestion;
    } else {
      console.log(
        chalk.red(
          "Sorry, but I didn't understand your answer. Please select Y or N,\n" +
            "or just hit enter if you want the default.\n"
        )
      );
      return question;
    }
  };
}

export function integerValidator(
  question: QuestionTree,
  nextQuestion?: QuestionTree,
  defaultResponse?: number
) {
  return (rawInput: string, answers: AnswerMap) => {
    const normalizedInput = parseInt(rawInput, 10);
    if (defaultResponse && isNaN(normalizedInput)) {
      answers[question.name] = defaultResponse;
      return nextQuestion;
    } else if (normalizedInput < 0 || isNaN(normalizedInput)) {
      console.log(
        chalk.red(
          "Sorry, but I didn't understand your answer. Please enter a valid integer.\n"
        )
      );
      return question;
    } else {
      answers[question.name] = normalizedInput;
      return nextQuestion;
    }
  };
}

export function stringValidator(
  question: QuestionTree,
  nextQuestion?: QuestionTree,
  defaultResponse?: string
) {
  return (rawInput: string, answers: AnswerMap) => {
    const normalizedInput = rawInput.toLowerCase();
    if (defaultResponse && normalizedInput === "") {
      answers[question.name] = defaultResponse;
      return nextQuestion;
    } else if (typeof normalizedInput === "string" && normalizedInput !== "") {
      answers[question.name] = normalizedInput;
      return nextQuestion;
    } else {
      console.log(
        chalk.red(
          "Sorry, but I didn't understand your answer. Please enter a valid string,\n" +
            "or just hit enter default is available.\n"
        )
      );
      return question;
    }
  };
}

export function passwordValidator(
  question: QuestionTree,
  nextQuestion?: QuestionTree
) {
  return (rawInput: string, answers: AnswerMap) => {
    const normalizedInput = rawInput.toString();
    if (normalizedInput === "") {
      answers[question.name] = normalizedInput;
      return nextQuestion;
    } else if (typeof normalizedInput === "string" && normalizedInput !== "") {
      answers[question.name] = normalizedInput;
      return nextQuestion;
    } else {
      console.log(
        chalk.red(
          "Sorry, but I didn't understand your answer. Please enter a valid string,\n" +
            "or just hit enter default is available.\n"
        )
      );
      return question;
    }
  };
}

const allocJsonChecks = (jsonAlloc: string) => {
  try {
    const parsedJSON = JSON.parse(jsonAlloc) as { [key: string]: Alloc };
    if (Object.keys(parsedJSON).length === 0) {
      return { status: false, message: "alloc must have at least one address" };
    }
    for (const [key, value] of Object.entries(parsedJSON)) {
      if (typeof key !== "string") {
        return {
          status: false,
          message: "Account key must be a string",
        };
      }
      if (typeof value.balance !== "string") {
        return {
          status: false,
          message: "Account's balance must be a string",
        };
      }
    }
    return { status: true, message: "Alloc is valid" };
  } catch (e) {
    return { status: false, message: "alloc must be a valid json object" };
  }
};

export function allocStringValidator(
  question: QuestionTree,
  nextQuestion?: QuestionTree,
  defaultResponse?: string
) {
  return (rawInput: string, answers: AnswerMap) => {
    const normalizedInput = rawInput.toLowerCase();
    if (defaultResponse && normalizedInput === "") {
      answers[question.name] = defaultResponse;
      return nextQuestion;
    } else if (typeof normalizedInput === "string" && normalizedInput !== "") {
      const additionalChecks: { status: boolean; message: string } =
        allocJsonChecks(normalizedInput);
      if (additionalChecks.status) {
        answers[question.name] = normalizedInput;
        return nextQuestion;
      } else {
        console.log(chalk.red(additionalChecks.message));
        return question;
      }
    } else {
      console.log(
        chalk.red(
          "Sorry, but I didn't understand your answer. Please enter a valid string,\n" +
            "or just hit enter default is available.\n"
        )
      );
      return question;
    }
  };
}
