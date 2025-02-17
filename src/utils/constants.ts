export const testWords = [
  { word: "a", isSelected: false, idxPosition: 1 },
  { word: "b", isSelected: false, idxPosition: 2 },
  { word: "c", isSelected: false, idxPosition: 3 },
  { word: "d", isSelected: false, idxPosition: 4 },
  { word: "e", isSelected: false, idxPosition: 5 },
  { word: "f", isSelected: false, idxPosition: 6 },
  { word: "g", isSelected: false, idxPosition: 7 },
  { word: "h", isSelected: false, idxPosition: 8 },
  { word: "i", isSelected: false, idxPosition: 9 },
  { word: "j", isSelected: false, idxPosition: 10 },
  { word: "k", isSelected: false, idxPosition: 11 },
  { word: "l", isSelected: false, idxPosition: 12 },
  { word: "m", isSelected: false, idxPosition: 13 },
  { word: "n", isSelected: false, idxPosition: 14 },
  { word: "o", isSelected: false, idxPosition: 15 },
  { word: "p", isSelected: false, idxPosition: 16 },
];

export const answerKey = [
  {
    description: "Answer 1",
    answer: new Set(["a", "f", "k", "p"]),
    color: "green",
  },
  {
    description: "Answer 2",
    answer: new Set(["e", "b", "c", "d"]),
    color: "blue",
  },
  {
    description: "Answer 3",
    answer: new Set(["i", "g", "j", "h"]),
    color: "yellow",
  },
  {
    description: "Answer 4",
    answer: new Set(["m", "n", "o", "l"]),
    color: "purple",
  },
];

export const RESET_MODAL_HEADER_TEXT = "Start over?";
export const RESET_MODAL_CONTENT_TEXT = "Do you want to try again?";
export const GAME_OVER_SUCCESS_HEADER_TEXT = "Congratulations, you won!";
export const GAME_OVER_FAILURE_HEADER_TEXT = "Game over! Try again?";
