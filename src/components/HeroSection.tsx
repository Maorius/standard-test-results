import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { Check } from "lucide-react";

const bullets = [
  "תוכנית אימונים ותזונה שמותאמת למציאות החיים שלך",
  "שיחה שבועית + זמינות כדי שלא תיעלם אחרי שבועיים",
  "התחלה עם מפגש 1:1 פרונטלי כדי להיכנס לקצב אמיתי",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04)_0%,transparent_70%)]" />

      <div className="container mx-auto max-w-4xl relative z-10 px-5 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] mb-6">
          הגוף שלך עדיין לא נראה
          <br />
          <span className="text-gold-gradient">כמו הסטנדרט שאתה דורש מעצמך.</span>
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

        <div className="flex flex-col items-center gap-4">
          <Button variant="gold" size="xl" onClick={scrollToForm} className="text-lg px-12">
            אני רוצה להפסיק להתחיל מחדש
          </Button>
          <p className="text-muted-foreground text-base">שיחת איפיון 5-10 דק • ללא התחייבות</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
