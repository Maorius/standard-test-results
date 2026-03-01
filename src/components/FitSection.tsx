import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { Check, X } from "lucide-react";

const fit = [
  "נמאס לך מהתחלות מחדש",
  "אתה רוצה תוצאה, לא אווירה",
  "אתה מוכן לקבל הכוונה ולבצע",
  "אתה רוצה תוכנית שמתאימה לחיים שלך",
];

const notFit = [
  'אתה מחפש קסם מהיר או "תן לי תפריט וזהו"',
  "אתה לא מוכן לשיחה שבועית ומעקב",
  'אתה מחפש מישהו שיגיד לך "הכול בסדר" גם כשאתה מוותר',
];

const FitSection = () => {
  return (
    <SectionWrapper>
      <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
        לפני שאתה ממלא טופס, בוא נדייק
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-primary font-bold text-lg mb-4">מתאים אם:</h3>
          <ul className="space-y-3">
            {fit.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-destructive font-bold text-lg mb-4">לא מתאים אם:</h3>
          <ul className="space-y-3">
            {notFit.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <X className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-primary font-bold text-center text-lg mb-8">
        הבעיה שלך היא לא אוכל. זו החלטה אחת קטנה שאתה שוב לא עומד בה.
      </p>

      <div className="text-center">
        <Button variant="goldOutline" size="lg" onClick={scrollToForm}>
          בדיקת התאמה בחינם
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default FitSection;
