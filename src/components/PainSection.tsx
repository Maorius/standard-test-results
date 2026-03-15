import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";

const statements = [
  "אתה מפסיק לסמוך על עצמך.",
  "כל ניסיון חדש מרגיש כבד יותר מהקודם.",
  "וזה כבר לא רק גוף שלא משתנה — אלא אמון עצמי שנשחק.",
];

const PainSection = () => {
  return (
    <SectionWrapper className="border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-black mb-8">
          זה כבר מזמן לא רק עניין של כושר.
        </h2>

        <div className="max-w-2xl mx-auto mb-14 space-y-1">
          {[
            "כל פעם שאתה מתחיל — ונשבר שוב,",
            "זה לא נשאר רק במראה.",
            "זה נכנס לאיך שאתה חושב על עצמך.",
            "לאיך שאתה מדבר עם עצמך.",
            "ולפער הזה בין מי שאתה רוצה להיות לבין איך שאתה חי בפועל.",
          ].map((line, i) => (
            <p key={i} className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        <div className="space-y-6 mb-14">
          {statements.map((s, i) => (
            <p
              key={i}
              className="text-foreground font-bold text-lg md:text-xl leading-snug"
            >
              {s}
            </p>
          ))}
        </div>

        <p className="text-primary font-black text-lg md:text-2xl leading-snug mb-12 max-w-2xl mx-auto">
          וזה בדיוק למה הבעיה היא לא עוד מוטיבציה —
          <br />
          אלא משהו שיחזיק גם כשאין אותה.
        </p>

        <div className="flex flex-col items-center gap-2">
          <Button variant="gold" size="xl" onClick={scrollToForm}>
            אני רוצה להפסיק להתחיל מחדש
          </Button>
          <span className="text-muted-foreground text-xs">שלב ראשון לתהליך אמיתי.</span>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default PainSection;
