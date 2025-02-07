import "./Gameboard.css";
import WordTile from "./WordTile";

const Gameboard = () => {
  /*
    responsible for rendering the board of words
    needs to share the number of attempts with remainingTries
    needs to respond to reset and give up buttons
    */
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
  return (
    <div className="gameboard-container">
      {testWords.map((word) => (
        <WordTile word={word} />
      ))}
    </div>
  );
};

export default Gameboard;
