import cx from "classnames";
import "./CorrectAnswer.css";
import { CorrectAnswerProps } from "../utils/types";

const CorrectAnswer = ({ answer, description, color }: CorrectAnswerProps) => {
  const answerToRender = Array.from(answer).toString();
  return (
    <div className={cx("correct-answer-container", { [color]: true })}>
      <div>{description}</div>
      <div>{answerToRender}</div>
    </div>
  );
};

export default CorrectAnswer;
