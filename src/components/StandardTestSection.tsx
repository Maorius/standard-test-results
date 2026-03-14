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
    title: "הבעיה שלך היא לא חוסר כוח רצון. הבעיה היא שבנית הכול על כוח רצון.",
    text: ["כל עוד התהליך נשען על חשק", "הוא יישבר ברגע שהחיים ייכנסו באמצע."],
    cta: "אני רוצה לבנות משהו שמחזיק",
  },
  {
    label: "אני מתאמן אבל לא רואה שינוי אמיתי",
    resultKey: "no_results",
    title: "הבעיה היא לא שאתה לא עובד קשה. הבעיה היא שעד עכשיו כנראה עבדת בלי דיוק.",
    text: ["וגוף לא משתנה לפי כמה ניסית", "אלא לפי כמה נכון בנית את הדרך."],
    cta: "אני רוצה לראות שינוי אמיתי",
  },
  {
    label: "אני כל הזמן אומר שאני אתחיל… אבל זה לא באמת קורה",
    resultKey: "getting_started",
    title: "הבעיה היא לא שאתה “לא בנוי לזה”. הבעיה היא שאתה עדיין מחכה לרגע המושלם להתחיל.",
    text: ["והרגע הזה כמעט אף פעם לא מגיע."],
    cta: "אני רוצה להתחיל כמו שצריך",
  },
  {
    label: "יש יותר מדי מידע ואני כבר לא יודע מה נכון לעשות",
    resultKey: "information_overload",
    title: "הבעיה שלך היא לא חוסר ידע. הבעיה שלך היא עודף ידע בלי כיוון.",
    text: ["יותר מדי עצות יוצרות אשליה של התקדמות.", "אבל בפועל משאירות אותך במקום."],
    cta: "אני רוצה תוכנית אידיאלית",
  },
  {
    label: "גם כשאני מתאמן התזונה שלי שוברת את זה",
    resultKey: "nutrition_breaks_it",
    title: "הבעיה היא לא שאתה לא מתאמץ. הבעיה היא שהגוף לא מקבל גיבוי מחוץ לאימון.",
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
        <p className="text-muted-foreground text-lg">בחר את מה שהכי מתאר אותך כרגע.</p>
      </div>

      <div className="max-w-2xl mx-auto">
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="rounded-xl p-6 md:p-8 gold-border bg-card relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <circle cx="10" cy="10" r="9" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <path d="M10 6v5" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="10" cy="14" r="1" fill="hsl(var(--primary))" />
                  </svg>
                  <span className="text-primary text-sm font-semibold tracking-wide">אבחון אישי</span>
                </div>

                <h3 className="text-primary font-bold text-lg md:text-xl mb-3 leading-snug">{selected.title}</h3>

                <div className="space-y-1 mb-4">
                  {selected.text.map((line, i) => (
                    <p key={i} className="text-foreground leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Button variant="gold" size="lg" onClick={scrollToForm}>
                    {selected.cta}
                  </Button>
                  <span className="text-muted-foreground text-sm">שלב ראשון לתהליך אמיתי.</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-4 mx-auto block text-sm text-muted-foreground hover:text-primary transition-colors"
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
