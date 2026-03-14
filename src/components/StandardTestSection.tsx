import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { cn } from "@/lib/utils";

const checkboxItems = [
  "אני מתחיל חזק ואז אחרי שבוע משהו מתפרק.",
  "אני יודע בדיוק מה צריך לעשות אבל משום מה זה לא מחזיק לאורך זמן.",
  "יש ימים שיש לי דרייב ויש ימים שאני פשוט לא מצליח להזיז את עצמי.",
  "אני יודע לתת עצות מצוינות לאחרים… פחות טוב ליישם אותן על עצמי.",
  "יש לי שבוע שאני על זה ואז שבוע שאני נעלם לגמרי.",
];

const StandardTestSection = () => {
  const [checked, setChecked] = useState<boolean[]>(new Array(5).fill(false));
  const checkedCount = checked.filter(Boolean).length;

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <SectionWrapper>
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-black mb-3">
          מבחן הסטנדרט האישי שלך <span className="text-muted-foreground font-normal text-lg">(30 שניות)</span>
        </h2>
        <p className="text-muted-foreground text-lg">תסמן מה נכון לגביך. זה לא שיפוט. זה אבחון.</p>
      </div>

      <div className="grid gap-3 max-w-2xl mx-auto mb-8">
        {checkboxItems.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={cn(
              "w-full text-right p-4 rounded-lg border transition-all duration-200 flex items-center gap-4",
              checked[i] ? "border-primary bg-primary/10" : "border-border bg-card hover:border-muted-foreground/30",
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors",
                checked[i] ? "bg-primary border-primary" : "border-muted-foreground/40",
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

      <div
        className={cn(
          "max-w-2xl mx-auto rounded-lg p-6 gold-border bg-card transition-all duration-500",
          checkedCount >= 2 ? "opacity-100" : "opacity-40",
        )}
      >
        <p className="text-primary font-bold mb-2">אם סימנת 2+</p>
        <p className="text-foreground mb-3">זה לא "אופי". זה מנגנון. מחליפים מנגנון, לא מאשימים את עצמנו.</p>
        <p className="text-primary text-sm font-semibold mb-6">התוצאה לא מגיעה כשנוח. היא מגיעה כשיש שיטה.</p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button variant="gold" size="lg" onClick={scrollToForm}>
            אני רוצה להפסיק להתחיל מחדש
          </Button>
          <span className="text-muted-foreground text-sm">ממלאים בדיקה קצרה ומתקדמים.</span>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default StandardTestSection;
