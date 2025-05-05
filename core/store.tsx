import { create } from "zustand";
import { Question } from "../core/question";

type QuizStore = {
  questionArray: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<number, string>;
  score: number;

  addQuestion: (question: Question) => void;
  addQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAnswer: (questionId: number, answer: string) => void;
  calculateScore: () => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  questionArray: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  score: 0,

  // Add a single question
  addQuestion: (question: Question) =>
    set((state) => ({
      questionArray: [...state.questionArray, question],
    })),

  addQuestions: (questions: Question[]) =>
    set((state) => ({
      questionArray: [...state.questionArray, ...questions],
    })),

  setCurrentQuestionIndex: (index: number) =>
    set({
      currentQuestionIndex: index,
    }),

  nextQuestion: () =>
    set((state) => {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex < state.questionArray.length) {
        return { currentQuestionIndex: nextIndex };
      }
      return state; // Stay on last question if we're already there
    }),

  previousQuestion: () =>
    set((state) => {
      const prevIndex = state.currentQuestionIndex - 1;
      if (prevIndex >= 0) {
        return { currentQuestionIndex: prevIndex };
      }
      return state;
    }),

  submitAnswer: (questionId: number, answer: string) =>
    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [questionId]: answer,
      },
    })),

  calculateScore: () =>
    set((state) => {
      const { questionArray, userAnswers } = state;
      let correctCount = 0;

      questionArray.forEach((question) => {
        const questionId = question.getQuestionId();
        const userAnswer = userAnswers[questionId];

        if (userAnswer && userAnswer === question.getCorrectAnswer()) {
          correctCount++;
        }
      });

      const score =
        questionArray.length > 0
          ? (correctCount / questionArray.length) * 100
          : 0;

      return { score };
    }),

  resetQuiz: () =>
    set({
      currentQuestionIndex: 0,
      userAnswers: {},
      score: 0,
    }),
}));

export const initializeQuiz = (quizData: any) => {
  const questionArray: Question[] = quizData.quiz.map((item: any) => {
    return new Question(
      item.question_number,
      item.question,
      Object.values(item.choices),
      item.correct_answer,
      item.explanation
    );
  });

  useQuizStore.getState().addQuestions(questionArray);
};
