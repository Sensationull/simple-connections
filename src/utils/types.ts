export type Word = { word: string; isSelected: boolean; idxPosition: number };

export type Answer = {
  description: string;
  answer: Set<string>;
  color: string;
};

export type GameState = {
  remainingTries: number;
  currentBoard: Word[];
  correctAnswers: Answer[] | null;
};

export type CorrectAnswerProps = {
  answer: Set<string>;
  description: string;
  color: string;
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
  correctAnswers: Answer[] | null;
};
