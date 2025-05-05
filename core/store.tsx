import { create } from "zustand";
import { Question } from "../core/question";

type QuizStore = {
  questionArray: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<number, {
    selectedAnswer: string;
    isCorrect: boolean;
  }>;
  score: number;
  totalAnswered: number;

  addQuestion: (question: Question) => void;
  addQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAnswer: (questionId: number, answer: string) => void;
  calculateScore: () => number;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  questionArray: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  score: 0,
  totalAnswered: 0,

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
    set((state) => {
      // Find the question with the matching ID
      const question = state.questionArray.find(q => q.getQuestionId() === questionId);
      
      if (!question) {
        return state; // Return unchanged state if question not found
      }
      
      // Compare user's answer with correct answer
      const correctAnswer = question.getCorrectAnswer();
      const isCorrect = answer === correctAnswer;
      
      // Update user answers with new answer data
      const updatedUserAnswers = {
        ...state.userAnswers,
        [questionId]: {
          selectedAnswer: answer,
          isCorrect: isCorrect
        }
      };
      
      // Count total correct answers
      let correctCount = 0;
      let answeredCount = 0;
      
      Object.values(updatedUserAnswers).forEach(answerData => {
        answeredCount++;
        if (answerData.isCorrect) {
          correctCount++;
        }
      });
      
      // Calculate new score as percentage
      const updatedScore = 
        answeredCount > 0
          ? (correctCount / state.questionArray.length) * 100
          : 0;
      
      // Return updated state with new score
      return {
        userAnswers: updatedUserAnswers,
        score: updatedScore,
        totalAnswered: answeredCount
      };
    }),

  calculateScore: () => {
    // This now returns the current score without recalculating
    // since score is updated with every answer submission
    return get().score;
  },

  resetQuiz: () =>
    set({
      currentQuestionIndex: 0,
      userAnswers: {},
      score: 0,
      totalAnswered: 0,
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