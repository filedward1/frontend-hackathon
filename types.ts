export interface Question {
  question_number: number;
  question: string;
  choices: {
    [key: string]: string;
  };
  correct_answer: string;
  explanation: string;
  module: string;
}

export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
  Profile: undefined;
  Quiz: undefined;
  Feedback: undefined
};
