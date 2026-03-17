import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { Dumbbell, Apple, Brain } from "lucide-react";

const engines = [
  {
    icon: Brain,
    title: "אימון מנטלי לביצוע",
    desc: "אם הראש נופל גם התהליך נופל.\nכאן עובדים גם על הרגעים שבהם הכי קל להישבר.",
  },
  {
    icon: Apple,
    title: "תזונה שאפשר לחיות איתה",
    desc: "לא תפריט שמתפרק אחרי שבוע \nאלא דרך אכילה שמחזיקה גם בתוך החיים עצמם.",
  },
  {
    icon: Dumbbell,
    title: "אימונים מותאמים",
    desc: "תוכנית מדויקת לרמה שלך,\nשמתקדמת יחד איתך ולא נשארת תקועה במקום.",
  },
];

const ThreeEnginesSection = () => {
  return (
    <SectionWrapper className="py-12 md:py-18 lg:py-24">
      {/* Title */}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-6 md:mb-8 leading-tight">
        שלושה דברים חייבים לעבוד יחד.
      </h2>

      {/* Intro text */}
      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 space-y-1.5 md:space-y-2">
        {[
          "לא מספיק להתאמן.",
          "לא מספיק לאכול טוב.",
          "ולא מספיק לרצות.",
          "",
          "כדי שזה יחזיק",
          "הגוף, ההרגלים והראש צריכים לעבוד יחד.",
        ].map((line, i) =>
          line === "" ? (
            <div key={i} className="h-1.5 md:h-2" />
          ) : (
            <p key={i} className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed">
              {line}
            </p>
          ),
        )}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-8 md:mb-12 max-w-5xl mx-auto">
        {engines.map((e) => (
          <div
            key={e.title}
            className="bg-card border border-border/60 rounded-2xl p-5 md:p-7 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_hsl(45,100%,50%,0.06)]"
          >
            <e.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3" />
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">{e.title}</h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">{e.desc}</p>
          </div>
        ))}
      </div>

      {/* Closing line */}
      <p className="text-primary font-black text-xl md:text-3xl lg:text-4xl leading-snug text-center mb-8 md:mb-10 max-w-3xl mx-auto">
        כשהשלושה האלה עובדים יחד
        <br />
        התוצאה כבר לא תלויה רק ביום טוב.
      </p>

      {/* CTA */}
      <div className="flex flex-col items-center gap-2">
        <Button
          variant="gold"
          size="lg"
          className="text-base md:text-lg px-8 py-4 md:px-12 md:py-5"
          onClick={scrollToForm}
        >
          אני רוצה להפסיק להתחיל מחדש
        </Button>
        <span className="text-muted-foreground text-xs md:text-sm">שיחת איפיון 5-10 דק • ללא התחייבות</span>
      </div>
    </SectionWrapper>
  );
};

export default ThreeEnginesSection;
