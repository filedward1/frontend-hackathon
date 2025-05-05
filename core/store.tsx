import { create } from "zustand";
import { Question } from "../core/question"

type QuizStore = {
    questionArray: Question[];
    currentQuestionIndex: number;
    addQuestion: (question: Question) => void;
}