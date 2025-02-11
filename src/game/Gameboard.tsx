import "./Gameboard.css";
import WordTile, { Word } from "./WordTile";
import CorrectAnswer from "../CorrectAnswer";

type GameboardProps = {
  onSelectWord(word: Word): void;
  wordsToRender: Word[];
  correctAnswers: { description: string; answer: Set<string> }[] | null;
};

const Gameboard = ({
  onSelectWord,
  wordsToRender,
  correctAnswers,
}: GameboardProps) => {
  /*
    responsible for rendering the board of words
    needs to share the number of attempts with remainingTries
    needs to respond to reset and give up buttons
    */

  return (
    <ul className="gameboard-container">
      {correctAnswers
        ? correctAnswers.map((answerRow) => (
            <CorrectAnswer
              key={answerRow.description}
              answer={answerRow.answer}
              description={answerRow.description}
            />
          ))
        : null}
      {wordsToRender.map((word) => (
        <WordTile key={word.word} word={word} onSelectWord={onSelectWord} />
      ))}
    </ul>
  );
};

export default Gameboard;
