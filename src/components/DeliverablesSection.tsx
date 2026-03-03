import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { Check } from "lucide-react";

const items = [
  "שיחת אפיון מלאה: אוכל אהוב, הרגלים, ניסיון קודם, לו״ז יומי",
  "תפריט/תזונה מותאמת אישית",
  "תוכנית אימונים מותאמת ומתעדכנת כל 6 שבועות",
  "שיחה שבועית (זום/פרונטלי): מעקב, אתגרים, התאמות",
  "זמינות בטלפון לכל שאלה",
  "חודש ראשון פרונטלי 1:1: טכניקה נכונה, כניסה לקצב, בסיס חזק",
];

const DeliverablesSection = () => {
  return (
    <SectionWrapper className="border-t border-border">
      <h2 className="text-2xl md:text-4xl font-black mb-4">המערכת שמייצרת תוצאה</h2>
      <p className="text-muted-foreground text-lg mb-10">לא "מוטיבציה". תוכנית, מעקב, ותיקונים בזמן אמת.</p>

      <ul className="space-y-4 max-w-2xl mb-10">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>

      <Button variant="goldOutline" size="lg" onClick={scrollToForm}>
        אני רוצה להפסיק להתחיל מחדש
      </Button>
    </SectionWrapper>
  );
};

export default DeliverablesSection;
