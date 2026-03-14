import { createContext, useContext, useState, ReactNode } from "react";

export type QuizResult =
  | "consistency"
  | "no_results"
  | "getting_started"
  | "information_overload"
  | "nutrition_breaks_it"
  | null;

interface QuizState {
  quizChoice: number | null;
  quizLabel: string;
  quizResult: QuizResult;
  hasInteracted: boolean;
  setQuizData: (choice: number, label: string, result: QuizResult) => void;
  clearQuiz: () => void;
}

const QuizContext = createContext<QuizState>({
  quizChoice: null,
  quizLabel: "",
  quizResult: null,
  hasInteracted: false,
  setQuizData: () => {},
  clearQuiz: () => {},
});

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizLabel, setQuizLabel] = useState("");
  const [quizResult, setQuizResult] = useState<QuizResult>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const setQuizData = (choice: number, label: string, result: QuizResult) => {
    setQuizChoice(choice);
    setQuizLabel(label);
    setQuizResult(result);
    setHasInteracted(true);
  };

  const clearQuiz = () => {
    setQuizChoice(null);
    setQuizLabel("");
    setQuizResult(null);
    setHasInteracted(false);
  };

  return (
    <QuizContext.Provider value={{ quizChoice, quizLabel, quizResult, hasInteracted, setQuizData, clearQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
