import "./CorrectAnswer.css";

type CorrectAnswerProps = {
  answer: Set<string>;
  description: string;
};

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
