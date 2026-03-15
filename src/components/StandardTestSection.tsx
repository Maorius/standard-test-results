import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { cn } from "@/lib/utils";
import { useQuiz, QuizResult } from "@/context/QuizContext";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  label: string;
  resultKey: QuizResult;
  title: string;
  text: string[];
  cta: string;
}

const options: Option[] = [
  {
    label: "אני לא מצליח להישאר עקבי לאורך זמן",
    resultKey: "consistency",
    title: "לא חסר לך כוח רצון. חסר לך משהו שיחזיק גם בלעדיו.",
    text: ["כל עוד התהליך נשען על חשק", "הוא יישבר ברגע שהחיים ייכנסו באמצע."],
    cta: "אני רוצה לבנות משהו שמחזיק",
  },
  {
    label: "אני כבר מתאמן אבל זה עדיין לא נראה עליי",
    resultKey: "no_results",
    title: "אתה לא תקוע בגלל חוסר מאמץ. אתה תקוע בגלל חוסר דיוק.",
    text: ["וגוף לא משתנה לפי כמה ניסית", "אלא לפי כמה נכון בנית את הדרך."],
    cta: "אני רוצה לראות שינוי אמיתי",
  },
  {
    label: "אני כל הזמן אומר שאני אתחיל… אבל זה לא באמת קורה",
    resultKey: "getting_started",
    title: "אתה לא מחכה לכושר. אתה מחכה לרגע מושלם שלא מגיע.",
    text: ["וכל דחייה כזאת שוחקת את האמון שלך בעצמך."],
    cta: "אני רוצה להתחיל כמו שצריך",
  },
  {
    label: "יש יותר מדי מידע ואני כבר לא יודע מה נכון לעשות",
    resultKey: "information_overload",
    title: "לא חסר לך ידע. חסר לך כיוון אחד ברור.",
    text: ["יותר מדי עצות יוצרות אשליה של התקדמות.", "אבל בפועל משאירות אותך במקום."],
    cta: "אני רוצה כיוון ברור",
  },
  {
    label: "גם כשאני מתאמן התזונה שלי שוברת את זה",
    resultKey: "nutrition_breaks_it",
    title: "האימון שלך לא נופל במכון. הוא נופל אחר כך.",
    text: ["אי אפשר לבנות תוצאה יציבה", "כשהתזונה כל פעם מושכת לכיוון אחר."],
    cta: "אני רוצה לסדר את התזונה",
  },
];

const StandardTestSection = () => {
  const { quizChoice, setQuizData, clearQuiz } = useQuiz();

  const selected = quizChoice !== null ? options[quizChoice - 1] : null;

  const handleSelect = (index: number) => {
    const opt = options[index];
    setQuizData(index + 1, opt.label, opt.resultKey);
  };

  const handleReset = () => {
    clearQuiz();
  };

  return (
    <SectionWrapper>
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-black mb-3">בדרך כלל יש סיבה אחת שחוזרת שוב ושוב.</h2>
        <p className="text-muted-foreground text-lg">במה אתה תקוע היום?</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-3"
            >
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "w-full text-right p-4 rounded-lg border transition-all duration-200",
                    "border-border bg-card hover:border-primary/50 hover:bg-primary/5",
                    "flex items-center gap-4 group cursor-pointer",
                  )}
                >
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/40 shrink-0 group-hover:border-primary transition-colors" />
                  <span className="text-foreground">{opt.label}</span>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div
                className={cn(
                  "w-full max-w-[780px] mx-auto text-center",
                  "rounded-2xl p-8 md:p-12 lg:p-14",
                  "bg-[hsl(0_0%_8%)] border border-primary/40",
                  "shadow-[0_0_60px_-15px_hsl(var(--primary)/0.15)]",
                  "backdrop-blur-sm",
                  "relative overflow-hidden",
                )}
              >
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                <div className="flex items-center justify-center gap-2 mb-6">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <circle cx="10" cy="10" r="9" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <path d="M10 6v5" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="10" cy="14" r="1" fill="hsl(var(--primary))" />
                  </svg>
                  <span className="text-primary text-sm font-semibold tracking-wide">אבחון אישי</span>
                </div>

                <h3 className="text-primary font-black text-xl md:text-2xl lg:text-3xl mb-5 leading-snug">
                  {selected.title}
                </h3>

                <div className="space-y-1 mb-8">
                  {selected.text.map((line, i) => (
                    <p key={i} className="text-muted-foreground text-base md:text-lg leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-3">
                  <Button variant="gold" size="xl" className="w-full max-w-xs" onClick={scrollToForm}>
                    {selected.cta}
                  </Button>
                  <span className="text-muted-foreground text-xs">שלב ראשון לתהליך אמיתי.</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-6 text-xs text-muted-foreground/60 hover:text-primary/80 transition-colors"
              >
                ← חזור ובחר תשובה אחרת
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
};

export default StandardTestSection;
