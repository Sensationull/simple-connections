import "./CorrectAnswer.css";
import { CorrectAnswerProps } from "./utils/types";

const CorrectAnswer = ({ answer, description }: CorrectAnswerProps) => {
  const answerToRender = Array.from(answer).toString();
  return (
    <div className="correct-answer-container">
      <div>{description}</div>
      <div>{answerToRender}</div>
    </div>
  );
};

export default CorrectAnswer;
