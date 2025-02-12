import cx from "classnames";
import "./WordTile.css";
import { WordTileProps } from "../utils/types";

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
