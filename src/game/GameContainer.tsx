import cx from "classnames";
import "./GameContainer.css";
import Gameboard from "./Gameboard";
import RemainingTries from "./RemainingTries";
import {
  RESET_MODAL_HEADER_TEXT,
  RESET_MODAL_CONTENT_TEXT,
  GAME_OVER_SUCCESS_HEADER_TEXT,
  GAME_OVER_FAILURE_HEADER_TEXT,
  GAME_OVER_SUCCESS_DESCRIPTION_TEXT,
  GAME_OVER_FAILURE_DESCRIPTION_TEXT,
} from "../utils/constants";
import Modal from "./Modal";
import useGameState from "../hooks/useGameState";

function GameContainer() {
  const {
    currentSelection,
    gameOverState,
    gameState,
    handleReset,
    handleSelectWord,
    handleSubmit,
  } = useGameState();

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
        {gameOverState === true && (
          <Modal
            headerText={GAME_OVER_SUCCESS_HEADER_TEXT}
            description={GAME_OVER_SUCCESS_DESCRIPTION_TEXT}
            onReset={handleReset}
            shouldShowButton={false}
          ></Modal>
        )}
        {gameOverState === false && (
          <Modal
            headerText={GAME_OVER_FAILURE_HEADER_TEXT}
            description={GAME_OVER_FAILURE_DESCRIPTION_TEXT}
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
