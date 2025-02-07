import "./WordTile.css";

type WordTileProps = {
  word: string;
};

const WordTile = ({ word }: WordTileProps) => {
  return <div className="word-container">{word}</div>;
};

export default WordTile;
