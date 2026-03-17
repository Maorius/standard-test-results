import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";

const modules = [
  {
    num: "01",
    title: "אפיון מלא",
    desc: "מבינים איך אתה חי, מה עוצר אותך,\nומה באמת אפשר לבנות סביב החיים שלך.",
  },
  {
    num: "02",
    title: "חודש ראשון 1:1",
    desc: "כניסה נכונה, טכניקה טובה, קצב נכון,\nובסיס חזק שמתחילים ממנו.",
  },
  {
    num: "03",
    title: "תזונה מותאמת",
    desc: "לא תפריט שמתפרק אחרי שבוע —\nאלא דרך אכילה שאתה באמת יכול לחיות איתה.",
  },
  {
    num: "04",
    title: "אימונים שמתעדכנים איתך",
    desc: "תוכנית מדויקת לרמה שלך,\nשמתקדמת יחד איתך — ולא נשארת קפואה במקום.",
  },
  {
    num: "05",
    title: "שיחה שבועית",
    desc: "כל שבוע עוצרים, בודקים, ומתקנים —\nכדי שלא תישאר לבד בתוך התהליך.",
  },
  {
    num: "06",
    title: "זמינות אמיתית",
    desc: "אתה לא נשאר לבד בין מפגש למפגש.\nיש לך עם מי לדבר גם ברגעים שבהם הכי קל ליפול.",
  },
];

const DeliverablesSection = () => {
  return (
    <SectionWrapper className="py-12 md:py-20 lg:py-28">
      {/* Header */}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-4 md:mb-5 leading-tight">
        מרגע שנכנסת — זה מה שקורה.
      </h2>
      <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
        לא עוד ניסיון שמתפרק אחרי שבוע.
        <br />
        אלא מערכת עבודה שנבנית סביבך — ומחזיקה אותך בתוכה.
      </p>

      {/* Overline */}
      <p className="text-muted-foreground/60 text-sm md:text-base text-center mb-8 md:mb-12 tracking-wide">
        לא ״מה כלול״. מה מחזיק את זה בפועל.
      </p>

      {/* Module Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto mb-10 md:mb-14">
        {modules.map((m) => (
          <div
            key={m.num}
            className="group relative bg-card/80 border border-border/50 rounded-2xl p-5 md:p-7 hover:border-primary/25 transition-all duration-300 hover:shadow-[0_0_24px_hsl(45,100%,50%,0.05)]"
          >
            {/* Module number */}
            <span className="absolute top-4 left-4 text-xs font-mono tracking-widest text-muted-foreground/40 select-none">
              {m.num}
            </span>

            {/* Accent bar */}
            <div className="w-8 h-[2px] bg-primary/50 mb-4 group-hover:w-12 group-hover:bg-primary/80 transition-all duration-300" />

            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              {m.title}
            </h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Closing line */}
      <p className="text-primary font-black text-xl md:text-3xl lg:text-4xl leading-snug text-center mb-8 md:mb-10 max-w-3xl mx-auto">
        ככה מפסיקים להתחיל מחדש —
        <br />
        ובונים משהו שבאמת מחזיק.
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
        <span className="text-muted-foreground text-xs md:text-sm">
          שלב ראשון לתהליך אמיתי.
        </span>
      </div>
    </SectionWrapper>
  );
};

export default DeliverablesSection;
