import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { Check, X } from "lucide-react";

const fit = [
  "נמאס לך להתחיל מחדש כל כמה שבועות.",
  "אתה רוצה תהליך שמחזיק גם כשאין חשק.",
  "אתה מוכן לעבוד נכון, לא רק להתלהב ולהיעלם.",
  "אתה רוצה ליווי שמתחבר לחיים שלך, לא נלחם בהם.",
];

const notFit = [
  "אתה מחפש פתרון מהיר בלי לשנות שום הרגל.",
  "אתה רוצה תוצאה אבל לא מוכן להכניס סדר, מעקב, ועבודה אמיתית.",
  "אתה מחפש מישהו שירגיע אותך, לא מישהו שיחזיק אותך.",
];

const FitSection = () => {
  return (
    <SectionWrapper>
      {/* Headline */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-14 md:mb-16 leading-tight">
        מגיע לך לעלות שלב בחיים
        <br />
        <span className="text-gold-gradient">אבל לא לכולם יש אומץ להתחיל.</span>
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12 md:mb-14">
        {/* Fit */}
        <div className="rounded-xl border border-primary/30 bg-card p-7 md:p-10 shadow-[0_0_30px_hsl(45,100%,50%,0.06)]">
          <h3 className="text-primary font-black text-2xl md:text-3xl mb-6">מתאים אם:</h3>
          <ul className="space-y-4">
            {fit.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                <span className="text-foreground text-base md:text-lg leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not fit */}
        <div className="rounded-xl border border-destructive/30 bg-card p-7 md:p-10">
          <h3 className="text-destructive font-black text-2xl md:text-3xl mb-6">לא מתאים אם:</h3>
          <ul className="space-y-4">
            {notFit.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <X className="h-5 w-5 text-destructive mt-1 shrink-0" />
                <span className="text-muted-foreground text-base md:text-lg leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Closing line */}
      <p className="text-center text-foreground font-bold text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10">
        לא כל אחד בנוי לתהליך כזה.
        <br />
        אבל מי שמוכן סוף סוף לזוז מרגיש את ההבדל מהר.
      </p>

      {/* CTA */}
      <div className="text-center">
        <Button variant="goldOutline" size="lg" onClick={scrollToForm}>
          אני רוצה להפסיק להתחיל מחדש
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default FitSection;
