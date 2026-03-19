import { useState } from "react";
import { Button } from "./ui/button";
import { scrollToForm } from "../lib/landing-utils";
import { Check } from "lucide-react";

const bullets = [
  "תוכנית אימונים ותזונה שמותאמת למציאות החיים שלך",
  "שיחה שבועית + זמינות כדי שלא תיעלם אחרי שבועיים",
  "התחלה עם מפגש 1:1 פרונטלי כדי להיכנס לקצב אמיתי",
];

const HeroSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

        {submitted ? (
          <div className="max-w-md mx-auto bg-card border border-primary/30 rounded-xl p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">הפרטים נשלחו בהצלחה!</h3>
            <p className="text-muted-foreground text-base">אחזור אליך בהקדם לתיאום שיחה קצרה.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col gap-3 mb-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="שם מלא"
                className="flex-1 h-12 rounded-lg border border-border bg-secondary px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="טלפון"
                dir="rtl"
                className="flex-1 h-12 rounded-lg border border-border bg-secondary px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="gold" size="xl" type="submit" className="text-lg px-12 w-full">
              אני רוצה להפסיק להתחיל מחדש
            </Button>
            <p className="text-muted-foreground text-base">שיחת איפיון 5-10 דק • ללא התחייבות</p>
          </form>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
