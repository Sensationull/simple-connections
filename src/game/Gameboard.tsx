import { BaseSyntheticEvent } from "react";
import "./Gameboard.css";
import WordTile from "./WordTile";

type GameboardProps = {
  onSelectWord(event: BaseSyntheticEvent): void;
  wordsToRender: string[];
};

const Gameboard = ({ onSelectWord, wordsToRender }: GameboardProps) => {
  /*
    responsible for rendering the board of words
    needs to share the number of attempts with remainingTries
    needs to respond to reset and give up buttons
    */

  return (
    <ul className="gameboard-container">
      {wordsToRender.map((word) => (
        <WordTile key={word} word={word} onSelectWord={onSelectWord} />
      ))}
    </ul>
  );
};

export default Gameboard;
