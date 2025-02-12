import { BaseSyntheticEvent, useEffect, useState } from "react";
import "./GameContainer.css";
import Gameboard from "./game/Gameboard";
import RemainingTries from "./game/RemainingTries";
import { testWords, answerKey } from "./utils/constants";
import { GameState, Word } from "./utils/types";

function GameContainer() {
  const [wordState, setWordState] = useState(testWords);
  const [gameState, setGameState] = useState<GameState>({
    remainingTries: 4,
    currentBoard: wordState,
    answerKey,
    correctAnswers: null,
  });
  const [currentSelection, setCurrentSelection] = useState<string[]>([]);

  useEffect(() => {
    // I need to sync the state but this is causing unecessary re-renders,
    // refactor if possible
    setGameState((prev) => ({ ...prev, currentBoard: wordState }));
  }, [wordState]);

  const isSelectionCorrect = (selection: string[]) => {
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

  const updateWordState = (word: Word) => {
    // ~ Helper for handleSelectWord ~
    setWordState((prev) => {
      const wordToUpdate = { ...word, isSelected: !word.isSelected };
      const prevWithoutWordToUpdate = prev.filter(
        (items) => items.word !== word.word,
      );
      const sortedAndUpdatedArr = [
        ...prevWithoutWordToUpdate,
        wordToUpdate,
      ].sort((a, b) => a.idxPosition - b.idxPosition);
      return sortedAndUpdatedArr;
    });
  };

  const handleSelectWord = (selectedWord: Word) => {
    // Make sure you can't select one that's been selected, update visual feedback
    const text = selectedWord.word;
    if (currentSelection.length < 4 && !currentSelection.includes(text)) {
      setCurrentSelection((prev) => [...prev, text]); // why use textContent instead of value?
      updateWordState(selectedWord);
    } else {
      setCurrentSelection((prev) => prev.filter((item) => item !== text));
      updateWordState(selectedWord);
    }
  };

  const handleClick = (event: BaseSyntheticEvent) => {
    console.log({ target: event.target.value });
  };

  const handleSubmit = () => {
    if (isSelectionCorrect(currentSelection)) {
      const remainingWords = wordState.filter(
        (word) => !currentSelection.includes(word.word),
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
          // .find returns a value or undefined, when I haven't given the option for undefined in
          // the type definition and I'm not sure I want to, re-evaluate later
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
        wordState.filter((word) => !currentSelection.includes(word.word)),
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
