import { Answer } from "./types";

export const isSelectionCorrect = (
  selection: string[],
  answerKey: Answer[],
) => {
  /*
      This is a n² solution, see if optimizing can be done later,
      although not a big issue as this is a 4x4 board
    */
  let isCorrect = false;
  answerKey.forEach((object) => {
    let currentMatch = true;
    selection.forEach((item) => {
      if (!object.answer.has(item)) {
        currentMatch = false;
      }
    });
    if (currentMatch) {
      isCorrect = true;
    }
  });
  return isCorrect;
};

export const shouldShowGameOver = (
  correctAnswers: Answer[] | null,
  remainingTries: number,
) => {
  const successState = correctAnswers && correctAnswers.length === 4;
  const failureState = remainingTries === 0;

  if (successState) {
    return true;
  } else if (failureState) {
    return false;
  }

  return null;
};
