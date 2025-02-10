import { BaseSyntheticEvent, useState } from "react";
import "./GameContainer.css";
import Gameboard from "./game/Gameboard";
import RemainingTries from "./game/RemainingTries";

const testWords = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
];

// This should stay a const because we'll use this as a reference for the final "Game over" modal

const answerKey = [
  { description: "Answer 1", answer: new Set(["a", "f", "k", "p"]) },
  { description: "Answer 2", answer: new Set(["e", "b", "c", "d"]) },
  { description: "Answer 3", answer: new Set(["i", "g", "j", "h"]) },
  { description: "Answer 4", answer: new Set(["m", "n", "o", "l"]) },
];

/* 
since we're managing the state for the answers here,
create the answerRow object here and pass it down to correctAnswer
potential for useContext? Gameboard is just passing props anyways
Instead of the answerkey holding just the sets of answers, maybe 
make an array of objects with an answer Set on it and a description,
then you can just pass down the specific set that matches. Array.find...
{
  description: 'answer1',
  answerKey: new Set([...])
},
{
  description: 'answer1',
  answerKey: new Set([...])
}, 
and so on
*/

type GameState = {
  remainingTries: number;
  currentBoard: string[];
  answerKey: { description: string; answer: Set<string> }[];
  correctAnswers: { description: string; answer: Set<string> }[] | null;
};

function GameContainer() {
  const [wordState, setWordState] = useState(testWords);
  const [gameState, setGameState] = useState<GameState>({
    remainingTries: 4,
    currentBoard: wordState,
    answerKey,
    correctAnswers: null,
  });
  const [currentSelection, setCurrentSelection] = useState<string[]>([]);

  const isSelectionCorrect = (selection: string[]) => {
    /*
      create a isCorrect variable
      iterate through the sets,
        create a currentMatch variable, set to true
          iterate through the selection
            if the set doesn't have an item in the selection
              set current match to false
          at the end of the selection, if currentMatch is still true
            set isCorrect to true
          return isCorrect
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

  const handleSelectWord = (event: BaseSyntheticEvent) => {
    // Make sure you can't select one that's been selected, update visual feedback
    if (currentSelection.length < 4) {
      setCurrentSelection((prev) => [...prev, event.target.textContent]); // why use textContent instead of value?
    }
  };

  const handleClick = (event: BaseSyntheticEvent) => {
    console.log({ target: event.target.value });
  };

  const handleSubmit = () => {
    if (isSelectionCorrect(currentSelection)) {
      const remainingWords = wordState.filter(
        (word) => !currentSelection.includes(word),
      );
      // I could say current selection at zero, but this seems brittle
      // trying to match the currentSelection to the answerKey state
      const newAnswer = gameState.answerKey.find((answers) =>
        answers.answer.has(currentSelection[0]),
      );

      if (newAnswer) {
        setGameState((prev) => {
          // This could probably be cleaned up??
          // TS issue with trying to spread correctAnswers on first go
          const setOrSpreadPreviousCorrectAnswers = prev.correctAnswers
            ? {
                ...prev,
                correctAnswers: [...prev.correctAnswers, newAnswer],
                currentBoard: remainingWords,
              }
            : {
                ...prev,
                correctAnswers: [newAnswer],
                currentBoard: remainingWords,
              };
          return { ...setOrSpreadPreviousCorrectAnswers };
        });
      }

      setWordState(
        wordState.filter((word) => !currentSelection.includes(word)),
      );
    } else {
      setGameState((prev) => ({
        ...prev,
        remainingTries: prev.remainingTries--, //  decrement remaining tries
      }));
    }
    setCurrentSelection([]);
  };
  return (
    <>
      <section className="game-container">
        <Gameboard
          onSelectWord={handleSelectWord}
          wordsToRender={gameState.currentBoard}
          correctAnswers={gameState.correctAnswers}
        />
        <RemainingTries count={gameState.remainingTries} />
        <div className="button-group">
          <button onClick={handleClick}>Reset</button>
          <button
            onClick={handleSubmit}
            disabled={currentSelection.length !== 4}
          >
            Submit
          </button>
        </div>
        {currentSelection &&
          currentSelection.map((selection) => (
            <div key={selection}>{selection}</div>
          ))}
      </section>
    </>
  );
}

export default GameContainer;
