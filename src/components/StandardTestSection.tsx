import { useState, useEffect, useMemo } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { cn } from "@/lib/utils";
import { useQuiz, QuizResult } from "@/context/QuizContext";
import { motion, AnimatePresence } from "framer-motion";

const checkboxItems = [
  "אני מתחיל חזק ואז אחרי שבוע משהו מתפרק.",
  "אני יודע מה צריך לעשות אבל משום מה זה לא מחזיק לאורך זמן.",
  "יש ימים שיש לי דרייב ויש ימים שאני פשוט לא מצליח להזיז את עצמי.",
  "אני יודע לתת עצות מצוינות לאחרים… פחות טוב ליישם אותן על עצמי.",
  "יש לי שבוע שאני על זה ואז שבוע שאני נעלם לגמרי.",
];

interface ResultContent {
  title: string;
  text: string[];
  transition: string;
  cta: string;
}

const resultMap: Record<string, ResultContent> = {
  baseline_consistency: {
    title: "יש לך בסיס. עכשיו צריך להפוך אותו לעקביות.",
    text: [
      "אתה לא באמת תקוע.",
      "אבל בלי מערכת ברורה גם התחלה טובה נשחקת עם הזמן.",
    ],
    transition: "המטרה היא לא להתחיל — אלא להחזיק.",
    cta: "אני רוצה לבנות עקביות",
  },
  lack_of_stability: {
    title: "אתה לא חסר ידע. אתה חסר יציבות.",
    text: [
      "אתה יודע מה צריך לעשות.",
      "אבל משהו נשבר באמצע הדרך.",
      "זה לא קורה פעם אחת.",
      "זה חוזר שוב ושוב.",
    ],
    transition: "וזה בדיוק הרגע שבו צריך מערכת — לא עוד ניסיון.",
    cta: "אני רוצה להפסיק להתחיל מחדש",
  },
  stuck_in_loop: {
    title: "אתה לא צריך עוד מוטיבציה. אתה צריך מערכת שמחזיקה אותך.",
    text: [
      "אתה כבר ניסית.",
      "הבעיה היא לא רצון — אלא מה קורה ביום שאין כוח.",
      "בלי מערכת שמחזיקה אותך, גם התחלה חזקה נשברת.",
    ],
    transition: "וכאן בדיוק ליווי אמיתי משנה את התמונה.",
    cta: "אני רוצה לצאת מהלופ הזה",
  },
};

function getQuizResult(count: number): QuizResult {
  if (count <= 1) return "baseline_consistency";
  if (count <= 3) return "lack_of_stability";
  return "stuck_in_loop";
}

const StandardTestSection = () => {
  const [checked, setChecked] = useState<boolean[]>(new Array(5).fill(false));
  const { setQuizData } = useQuiz();

  const checkedCount = checked.filter(Boolean).length;
  const hasChecked = checkedCount > 0;
  const resultKey = getQuizResult(checkedCount);
  const result = resultKey ? resultMap[resultKey] : null;

  const selectedAnswers = useMemo(
    () => checkboxItems.filter((_, i) => checked[i]),
    [checked]
  );

  useEffect(() => {
    if (hasChecked && resultKey) {
      setQuizData(checkedCount, resultKey, selectedAnswers);
    }
  }, [checkedCount, resultKey, selectedAnswers, hasChecked, setQuizData]);

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <SectionWrapper>
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-black mb-3">
          מבחן הסטנדרט האישי שלך{" "}
          <span className="text-muted-foreground font-normal text-lg">(30 שניות)</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          תסמן מה נכון לגביך.
          <br />
          זה לא שיפוט — זה אבחון.
        </p>
      </div>

      <div className="grid gap-3 max-w-2xl mx-auto mb-8">
        {checkboxItems.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={cn(
              "w-full text-right p-4 rounded-lg border transition-all duration-200 flex items-center gap-4",
              checked[i]
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-muted-foreground/30"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors",
                checked[i] ? "bg-primary border-primary" : "border-muted-foreground/40"
              )}
            >
              {checked[i] && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="hsl(0,0%,7%)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-foreground">{item}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {hasChecked && result && (
          <motion.div
            key={resultKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-2xl mx-auto rounded-xl p-6 md:p-8 gold-border bg-card relative overflow-hidden"
          >
            {/* Diagnosis accent */}
            <div className="flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                <circle cx="10" cy="10" r="9" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <path d="M10 6v5" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="14" r="1" fill="hsl(var(--primary))" />
              </svg>
              <span className="text-primary text-sm font-semibold tracking-wide">אבחון אישי</span>
            </div>

            <h3 className="text-primary font-bold text-lg md:text-xl mb-3 leading-snug">
              {result.title}
            </h3>

            <div className="space-y-1 mb-4">
              {result.text.map((line, i) => (
                <p key={i} className="text-foreground leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <p className="text-primary text-sm font-semibold mb-6">{result.transition}</p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button variant="gold" size="lg" onClick={scrollToForm}>
                {result.cta}
              </Button>
              <span className="text-muted-foreground text-sm">שלב ראשון לתהליך אמיתי.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default StandardTestSection;
