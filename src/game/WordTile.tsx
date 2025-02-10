import { BaseSyntheticEvent } from "react";
import "./WordTile.css";

type WordTileProps = {
  word: string;
  onSelectWord(event: BaseSyntheticEvent): void;
};

const WordTile = ({ word, onSelectWord }: WordTileProps) => {
  return (
    <li className="word-container" onClick={onSelectWord}>
      {word}
    </li>
  );
};

export default WordTile;
