export type Word = { word: string; isSelected: boolean; idxPosition: number };

export type Answer = { description: string; answer: Set<string> };

export type GameState = {
  remainingTries: number;
  currentBoard: Word[];
  answerKey: Answer[];
  correctAnswers: Answer[] | null;
};

export type CorrectAnswerProps = {
  answer: Set<string>;
  description: string;
};

export type RemainingTriesProps = {
  count: number;
};

export type WordTileProps = {
  word: Word;
  onSelectWord(word: Word): void;
};

export type GameboardProps = {
  onSelectWord(word: Word): void;
  wordsToRender: Word[];
  correctAnswers: { description: string; answer: Set<string> }[] | null;
};
