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
  new Set(["a", "f", "k", "p"]),
  new Set(["e", "b", "c", "d"]),
  new Set(["i", "g", "j", "h"]),
  new Set(["m", "n", "o", "l"]),
];

function GameContainer() {
  const [wordState, setWordState] = useState(testWords);

  const [gameState, setGameState] = useState({
    remainingTries: 4,
    originalBoard: testWords,
    currentBoard: wordState,
    answerKey,
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
    answerKey.forEach((answer) => {
      let currentMatch = true;
      selection.forEach((item) => {
        if (!answer.has(item)) {
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
      setGameState((prev) => ({ ...prev, currentBoard: remainingWords }));
      setWordState(
        wordState.filter((word) => !currentSelection.includes(word)),
      );
      // render the correct answer row
    } else {
      // show an error on screen here and decrement remaining tries
    }
    // reset the current selection
    setCurrentSelection([]);
  };
  return (
    <>
      <section className="game-container">
        <Gameboard
          onSelectWord={handleSelectWord}
          wordsToRender={gameState.currentBoard}
        />
        <RemainingTries />
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
