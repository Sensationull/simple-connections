import cx from "classnames";
import "./WordTile.css";

export type Word = { word: string; isSelected: boolean; idxPosition: number };

type WordTileProps = {
  word: Word;
  onSelectWord(word: Word): void;
};

const WordTile = ({ word, onSelectWord }: WordTileProps) => {
  return (
    <li
      className={cx("word-container", { "is-selected": word.isSelected })}
      onClick={() => onSelectWord(word)}
    >
      {word.word}
    </li>
  );
};

export default WordTile;
