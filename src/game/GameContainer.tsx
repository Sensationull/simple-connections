import { useEffect, useState } from "react";
import cx from "classnames";
import "./GameContainer.css";
import Gameboard from "./Gameboard";
import RemainingTries from "./RemainingTries";
import {
  testWords,
  answerKey,
  RESET_MODAL_HEADER_TEXT,
  RESET_MODAL_CONTENT_TEXT,
  GAME_OVER_SUCCESS_HEADER_TEXT,
  GAME_OVER_FAILURE_HEADER_TEXT,
} from "../utils/constants";
import { GameState, Word } from "../utils/types";
import Modal from "./Modal";
import { isSelectionCorrect, shouldShowGameOver } from "../utils/helpers";

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

  const updateWordState = (word: Word, selectState: boolean) => {
    // ~ Helper for handleSelectWord ~
    setWordState((prev) => {
      const wordToUpdate = { ...word, isSelected: selectState };
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
    const text = selectedWord.word;
    if (currentSelection.length < 4 && !currentSelection.includes(text)) {
      setCurrentSelection((prev) => [...prev, text]);
      updateWordState(selectedWord, true);
    } else {
      setCurrentSelection((prev) => prev.filter((item) => item !== text));
      updateWordState(selectedWord, false);
    }
  };

  const handleSubmit = () => {
    if (isSelectionCorrect(currentSelection, answerKey)) {
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
        remainingTries: prev.remainingTries - 1, //  decrement remaining tries, do not use the postdecrement operator (breaks tests)
      }));
      const resetSelectedWords = wordState.filter(
        (
          word, // find selected words
        ) => currentSelection.includes(word.word),
      );
      resetSelectedWords.forEach((word) => {
        updateWordState(word, false); // reset selected words
      });
    }
    setCurrentSelection([]);
  };

  const handleReset = () => {
    setGameState({
      remainingTries: 4,
      currentBoard: testWords,
      answerKey,
      correctAnswers: null,
    });
    setCurrentSelection([]);
    setWordState(testWords);
  };

  const gameOverSuccessState = shouldShowGameOver(
    gameState.correctAnswers,
    gameState.remainingTries,
  );

  return (
    <>
      <section className="game-container">
        {/* <h1>Create groups of four!</h1> */}
        <Gameboard
          onSelectWord={handleSelectWord}
          wordsToRender={gameState.currentBoard}
          correctAnswers={gameState.correctAnswers}
        />
        <RemainingTries count={gameState.remainingTries} />
        {/*
          There's potentially cleaner way to write this?
          I want to have the modal appear when the game is over
        */}
        {gameOverSuccessState === true && (
          <Modal
            headerText={GAME_OVER_SUCCESS_HEADER_TEXT}
            description="You're so connected! Try again?"
            onReset={handleReset}
            shouldShowButton={false}
          ></Modal>
        )}
        {gameOverSuccessState === false && (
          <Modal
            headerText={GAME_OVER_FAILURE_HEADER_TEXT}
            description="Sorry, would you like to try again?"
            onReset={handleReset}
            shouldShowButton={false}
          ></Modal>
        )}
        <div className="button-group">
          <Modal
            headerText={RESET_MODAL_HEADER_TEXT}
            description={RESET_MODAL_CONTENT_TEXT}
            onReset={handleReset}
            shouldShowButton
          ></Modal>
          <button
            onClick={handleSubmit}
            disabled={currentSelection.length !== 4}
            id={cx({ "is-active": currentSelection.length === 4 })}
            type="submit"
          >
            Submit
          </button>
        </div>
      </section>
    </>
  );
}

export default GameContainer;
