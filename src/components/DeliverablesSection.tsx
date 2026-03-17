import { useEffect, useRef, useState } from "react";
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

/** Thin horizontal arrow between cards in a row (desktop only) */
const FlowArrow = ({ delay }: { delay: number }) => (
  <div
    className="hidden lg:flex items-center justify-center -mx-2 self-center"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-6 h-[1px] bg-primary/20" />
    <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-r-[5px] border-r-primary/25 rotate-180" />
  </div>
);

/** Thin vertical connector between rows (desktop only) */
const RowConnector = () => (
  <div className="hidden lg:flex col-span-full justify-center -my-1">
    <div className="flex flex-col items-center gap-0">
      <div className="h-5 w-[1px] bg-primary/15" />
      <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-primary/20" />
    </div>
  </div>
);

/** Vertical flow line for mobile between stacked cards */
const MobileFlowLine = () => (
  <div className="flex lg:hidden justify-center -my-1">
    <div className="h-5 w-[1px] bg-primary/15" />
  </div>
);

const ModuleCard = ({
  m,
  index,
  isVisible,
}: {
  m: (typeof modules)[0];
  index: number;
  isVisible: boolean;
}) => {
  const delay = index * 120;

  return (
    <div
      className="group relative bg-card/80 border border-border/50 rounded-2xl p-5 md:p-7 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_hsl(45,100%,50%,0.06)]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(24px) scale(0.97)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {/* Large step number */}
      <span className="absolute top-3 left-4 text-3xl md:text-4xl font-black font-mono tracking-tighter text-primary/[0.08] select-none leading-none group-hover:text-primary/[0.14] transition-colors duration-500">
        {m.num}
      </span>

      {/* Accent bar */}
      <div className="w-8 h-[2px] bg-primary/50 mb-4 group-hover:w-12 group-hover:bg-primary/80 transition-all duration-300" />

      {/* Inline step badge */}
      <span className="inline-block text-[10px] md:text-xs font-mono tracking-widest text-primary/40 mb-2 group-hover:text-primary/60 transition-colors duration-300">
        STEP {m.num}
      </span>

      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
        {m.title}
      </h3>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
        {m.desc}
      </p>
    </div>
  );
};

const DeliverablesSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  // Split modules into two rows for desktop flow layout
  const row1 = modules.slice(0, 3);
  const row2 = modules.slice(3, 6);

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

      {/* Module Grid – Desktop: 3-col with flow arrows */}
      <div ref={gridRef} className="max-w-5xl mx-auto mb-10 md:mb-14">
        {/* Desktop layout with arrows */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-0 items-stretch">
          {/* Row 1 */}
          {row1.map((m, i) => (
            <>
              <ModuleCard key={m.num} m={m} index={i} isVisible={isVisible} />
              {i < 2 && <FlowArrow delay={i * 120 + 60} />}
            </>
          ))}

          {/* Row connector */}
          <div className="col-span-full flex justify-center py-2">
            <div className="flex flex-col items-center">
              <div className="h-6 w-[1px] bg-primary/15" />
              <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-primary/20" />
            </div>
          </div>

          {/* Row 2 */}
          {row2.map((m, i) => (
            <>
              <ModuleCard
                key={m.num}
                m={m}
                index={i + 3}
                isVisible={isVisible}
              />
              {i < 2 && <FlowArrow delay={(i + 3) * 120 + 60} />}
            </>
          ))}
        </div>

        {/* Mobile / Tablet layout – stacked with vertical flow lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {modules.map((m, i) => (
            <div key={m.num} className="contents sm:block">
              <ModuleCard m={m} index={i} isVisible={isVisible} />
              {/* Vertical connector on mobile only (single column) */}
              {i < modules.length - 1 && (
                <div className="flex sm:hidden justify-center -my-1">
                  <div className="h-4 w-[1px] bg-primary/15" />
                </div>
              )}
            </div>
          ))}
        </div>
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
