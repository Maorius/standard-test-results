import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { Dumbbell, Apple, Brain } from "lucide-react";

const engines = [
  {
    icon: Brain,
    title: "אימון מנטלי לביצוע",
    desc: "אם הראש נופל — גם התהליך נופל.\nכאן עובדים גם על הרגעים שבהם הכי קל להישבר.",
  },
  {
    icon: Apple,
    title: "תזונה שאפשר לחיות איתה",
    desc: "לא תפריט שמתפרק אחרי שבוע —\nאלא דרך אכילה שמחזיקה גם בתוך החיים עצמם.",
  },
  {
    icon: Dumbbell,
    title: "אימונים מותאמים",
    desc: "תוכנית מדויקת לרמה שלך,\nשמתקדמת יחד איתך — ולא נשארת תקועה במקום.",
  },
];

const ThreeEnginesSection = () => {
  return (
    <SectionWrapper className="py-16 md:py-24 lg:py-32">
      {/* Title */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-8 md:mb-12 leading-tight">
        שלושה דברים חייבים לעבוד יחד.
      </h2>

      {/* Intro text */}
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 space-y-2 md:space-y-3">
        {[
          "לא מספיק להתאמן.",
          "לא מספיק לאכול טוב.",
          "ולא מספיק לרצות.",
          "",
          "כדי שזה יחזיק —",
          "הגוף, ההרגלים והראש צריכים לעבוד יחד.",
        ].map((line, i) =>
          line === "" ? (
            <div key={i} className="h-2 md:h-3" />
          ) : (
            <p
              key={i}
              className="text-muted-foreground text-xl md:text-2xl lg:text-3xl leading-relaxed"
            >
              {line}
            </p>
          )
        )}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16 max-w-5xl mx-auto">
        {engines.map((e) => (
          <div
            key={e.title}
            className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_hsl(45,100%,50%,0.06)]"
          >
            <e.icon className="h-9 w-9 md:h-11 md:w-11 text-primary mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{e.title}</h3>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed whitespace-pre-line">
              {e.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Closing line */}
      <p className="text-primary font-black text-2xl md:text-4xl lg:text-5xl leading-snug text-center mb-10 md:mb-14 max-w-3xl mx-auto">
        כשהשלושה האלה עובדים יחד —
        <br />
        התוצאה כבר לא תלויה רק ביום טוב.
      </p>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3">
        <Button
          variant="gold"
          size="xl"
          className="text-lg md:text-xl px-10 py-5 md:px-14 md:py-6"
          onClick={scrollToForm}
        >
          אני רוצה להפסיק להתחיל מחדש
        </Button>
        <span className="text-muted-foreground text-sm md:text-base">
          שלב ראשון לתהליך אמיתי.
        </span>
      </div>
    </SectionWrapper>
  );
};

export default ThreeEnginesSection;
