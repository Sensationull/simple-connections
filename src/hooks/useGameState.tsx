import { useEffect, useState } from "react";
import { Answer, GameState, Word } from "../utils/types";
import { testWords } from "../utils/constants";
import { answerKey } from "../utils/constants";
import { isSelectionCorrect } from "../utils/helpers";

const useGameState = () => {
  const [wordState, setWordState] = useState(testWords);
  // I need to keep track of the words that should be displayed
  const [currentSelection, setCurrentSelection] = useState<string[]>([]);
  // I need to keep track of the current selection of words
  const [gameState, setGameState] = useState<GameState>({
    remainingTries: 4, // How many tries are remaining
    currentBoard: wordState, // the board initially looks like
    correctAnswers: null, // if there are any correct answers
  });

  useEffect(() => {
    // I need to sync the state but this could be causing unecessary re-renders,
    // Look for "You might not need useEffect react docs"
    setGameState((prev) => ({ ...prev, currentBoard: wordState }));
  }, [wordState]);

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

  const updateCorrectAnswers = (newAnswer: Answer) => {
    setGameState((prev) => {
      // This could probably be cleaned up??
      // TS issue with trying to spread correctAnswers when correctAnswers could be null
      // .find returns a value or undefined, when I haven't given the option for undefined in
      // the type definition and I'm not sure I want to, re-evaluate later
      const remainingWords = wordState.filter(
        (word) => !currentSelection.includes(word.word),
      );

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
  };

  const decrementRemainingTries = () => {
    setGameState((prev) => ({
      ...prev,
      remainingTries: prev.remainingTries - 1, //  decrement remaining tries, do not use the postdecrement operator (breaks tests)
    }));
  };

  const resetSelectedWordState = () => {
    const resetSelectedWords = wordState.filter(
      (
        word, // find selected words
      ) => currentSelection.includes(word.word),
    );
    resetSelectedWords.forEach((word) => {
      updateWordState(word, false); // reset selected words
    });
  };

  const handleSubmit = () => {
    if (isSelectionCorrect(currentSelection, answerKey)) {
      // isSelectionCorrect tells me if the current selection is in the answer key,
      // but not which answer in the answer key
      // I could say current selection at zero, but this seems brittle
      // I'm trying to match the currentSelection to the answerKey
      const newAnswer = answerKey.find((answers) =>
        // find the answer Set that has one item from the current selection (each set is unique)
        answers.answer.has(currentSelection[0]),
      )!; // <- using non-null here because I know you will always find an answer by this point
      // consider rewriting isSelectionCorrect to verify correctness and return the correct answer?
      //   or does that break Single Responsibility Principle?
      updateCorrectAnswers(newAnswer);

      setWordState(
        wordState.filter((word) => !currentSelection.includes(word.word)),
      );
    } else {
      decrementRemainingTries();
      resetSelectedWordState();
    }
    setCurrentSelection([]); // clear the current selection
  };

  const handleReset = () => {
    setGameState({
      remainingTries: 4,
      currentBoard: testWords,
      correctAnswers: null,
    });
    setCurrentSelection([]);
    setWordState(testWords);
  };

  return {
    currentSelection,
    setCurrentSelection,
    gameState,
    setGameState,
    setWordState,
    handleSelectWord,
    wordState,
    handleSubmit,
    handleReset,
  };
};

export default useGameState;
