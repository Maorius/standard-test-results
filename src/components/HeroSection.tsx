import { useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { useQuiz } from "../context/QuizContext";

const bullets = [
  "תוכנית אימונים ותזונה שמותאמת למציאות החיים שלך",
  "שיחה שבועית + זמינות כדי שלא תיעלם אחרי שבועיים",
  "התחלה עם מפגש 1:1 פרונטלי כדי להיכנס לקצב אמיתי",
];

const bridgeMessages: Record<string, string> = {
  consistency: "נראה שהעקביות היא האתגר המרכזי שלך. בוא נבנה מערכת שמחזיקה.",
  no_results: "אתה כבר מתאמן — עכשיו צריך לכוון את זה נכון.",
  getting_started: "ההתחלה היא הצעד הכי קשה. בוא נעשה אותו ביחד.",
  information_overload: "יותר מדי מידע? בוא נפשט את זה לתוכנית אחת ברורה.",
  nutrition_breaks_it: "האימונים במקום — עכשיו צריך לסדר את התזונה.",
};

const inputClass =
  "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const HeroSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const { quizChoice, quizLabel, quizResult, hasInteracted } = useQuiz();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const bridgeMessage = quizResult ? bridgeMessages[quizResult] : null;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04)_0%,transparent_70%)]" />

      <div className="container mx-auto max-w-4xl relative z-10 px-5 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] mb-6">
          הגוף שלך עדיין לא נראה
          <br />
          <span className="text-gold-gradient">כמו הסטנדרט שאתה דורש מעצמך!</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
          הבעיה היא לא לדעת מה נכון.
          <span className="text-foreground font-medium"> הבעיה היא </span> להחזיק את זה מספיק זמן כדי שהגוף שלך
          <span className="text-foreground font-medium"> באמת ישתנה.</span>
        </p>

        <ul className="space-y-4 mb-10 max-w-xl mx-auto text-right">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-3">
              <Check className="h-6 w-6 text-primary shrink-0" />
              <span className="text-foreground text-lg md:text-xl">{b}</span>
            </li>
          ))}
        </ul>

        {submitted ? (
          <div className="max-w-xl mx-auto bg-card border border-primary/30 rounded-xl p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">הטופס נשלח בהצלחה!</h3>
            <p className="text-muted-foreground text-base md:text-lg">אחזור אליך בהקדם לתיאום שיחה קצרה.</p>
          </div>
        ) : (
          <>
            {hasInteracted && bridgeMessage && (
              <div className="max-w-xl mx-auto mb-6 text-center">
                <p className="text-primary/90 text-base font-medium">{bridgeMessage}</p>
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto bg-card border border-border rounded-xl p-7 md:p-10 space-y-6"
            >
              {hasInteracted && (
                <>
                  <input type="hidden" name="quiz_type" value="single_choice_diagnosis" />
                  <input type="hidden" name="quiz_choice" value={quizChoice ?? ""} />
                  <input type="hidden" name="quiz_label" value={quizLabel} />
                  <input type="hidden" name="quiz_result" value={quizResult || ""} />
                </>
              )}

              <div>
                <label className="block text-base md:text-lg font-semibold text-foreground mb-2">שם מלא</label>
                <input
                  type="text"
                  required
                  placeholder="השם שלך"
                  className={inputClass + " text-base md:text-lg py-3.5"}
                />
              </div>

              <div>
                <label className="block text-base md:text-lg font-semibold text-foreground mb-2">טלפון</label>
                <input
                  type="tel"
                  required
                  placeholder="050-0000000"
                  className={inputClass + " text-base md:text-lg py-3.5"}
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-base md:text-lg font-semibold text-foreground mb-2">
                  מה הכי עוצר אותך כרגע?
                </label>
                <textarea
                  rows={2}
                  placeholder="כתוב בקצרה..."
                  className={inputClass + " text-base md:text-lg py-3.5"}
                />
              </div>

              <Button
                variant="gold"
                size="xl"
                type="submit"
                className="w-full mt-2 whitespace-normal break-words leading-snug text-sm sm:text-base md:text-lg min-h-[3rem] h-auto py-3 px-4"
              >
                אני רוצה להפסיק להתחיל מחדש
              </Button>

              <p className="text-center text-muted-foreground text-sm">שיחת איפיון 5-10 דק • ללא התחייבות</p>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
