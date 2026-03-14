import { createContext, useContext, useState, ReactNode } from "react";

export type QuizResult = "baseline_consistency" | "lack_of_stability" | "stuck_in_loop" | null;

interface QuizState {
  quizScore: number;
  quizResult: QuizResult;
  quizAnswers: string[];
  hasInteracted: boolean;
  setQuizData: (score: number, result: QuizResult, answers: string[]) => void;
}

const QuizContext = createContext<QuizState>({
  quizScore: 0,
  quizResult: null,
  quizAnswers: [],
  hasInteracted: false,
  setQuizData: () => {},
});

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizScore, setQuizScore] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult>(null);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  const setQuizData = (score: number, result: QuizResult, answers: string[]) => {
    setQuizScore(score);
    setQuizResult(result);
    setQuizAnswers(answers);
    setHasInteracted(true);
  };

  return (
    <QuizContext.Provider value={{ quizScore, quizResult, quizAnswers, hasInteracted, setQuizData }}>
      {children}
    </QuizContext.Provider>
  );
};
