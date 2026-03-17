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

const ModuleCard = ({
  m,
  index,
  isVisible,
}: {
  m: (typeof modules)[0];
  index: number;
  isVisible: boolean;
}) => {
  const delay = index * 150;

  return (
    <div
      className="group relative bg-card/90 border-2 border-border/60 rounded-2xl p-5 md:p-7 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(45,100%,50%,0.12)] overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(32px) scale(0.94)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {/* Large background number */}
      <span className="absolute -top-2 left-3 text-7xl md:text-8xl font-black font-mono text-primary/[0.07] select-none leading-none group-hover:text-primary/[0.15] transition-colors duration-500 pointer-events-none">
        {m.num}
      </span>

      {/* Step badge with accent dot */}
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(45,100%,50%,0.5)] transition-all duration-300" />
        <span className="text-xs md:text-sm font-mono tracking-widest text-primary/50 group-hover:text-primary/80 transition-colors duration-300 font-bold">
          STEP {m.num}
        </span>
      </div>

      {/* Accent bar */}
      <div className="w-10 h-[3px] bg-primary/60 mb-4 group-hover:w-16 group-hover:bg-primary transition-all duration-300 rounded-full" />

      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 relative z-10">
        {m.title}
      </h3>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line relative z-10">
        {m.desc}
      </p>

      {/* Bottom glow on hover */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-primary/0 group-hover:from-primary/20 transition-all duration-500 rounded-b-2xl" />
    </div>
  );
};

/** Horizontal flow arrow between cards (desktop) */
const HorizontalArrow = ({
  isVisible,
  delay,
}: {
  isVisible: boolean;
  delay: number;
}) => (
  <div
    className="hidden lg:flex items-center justify-center self-center"
    style={{
      opacity: isVisible ? 1 : 0,
      transition: `opacity 0.5s ease-out ${delay}ms`,
    }}
  >
    <div className="flex items-center gap-0">
      <div className="w-8 h-[2px] bg-gradient-to-l from-primary/50 to-primary/15 rounded-full shadow-[0_0_6px_hsl(45,100%,50%,0.15)]" />
      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] border-r-primary/50 rotate-180 drop-shadow-[0_0_4px_hsl(45,100%,50%,0.3)]" />
    </div>
  </div>
);

/** Vertical connector between rows (desktop) */
const VerticalConnector = ({
  isVisible,
  delay,
}: {
  isVisible: boolean;
  delay: number;
}) => (
  <div
    className="hidden lg:flex col-span-full justify-center py-1"
    style={{
      opacity: isVisible ? 1 : 0,
      transition: `opacity 0.6s ease-out ${delay}ms`,
    }}
  >
    <div className="flex flex-col items-center gap-0">
      <div className="h-8 w-[2px] bg-gradient-to-b from-primary/40 to-primary/20 rounded-full shadow-[0_0_6px_hsl(45,100%,50%,0.12)]" />
      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-primary/40 drop-shadow-[0_0_4px_hsl(45,100%,50%,0.25)]" />
    </div>
  </div>
);

/** Mobile vertical connector */
const MobileConnector = ({
  isVisible,
  delay,
}: {
  isVisible: boolean;
  delay: number;
}) => (
  <div
    className="flex lg:hidden justify-center py-0.5"
    style={{
      opacity: isVisible ? 1 : 0,
      transition: `opacity 0.5s ease-out ${delay}ms`,
    }}
  >
    <div className="flex flex-col items-center gap-0">
      <div className="h-6 w-[2px] bg-gradient-to-b from-primary/35 to-primary/15 rounded-full shadow-[0_0_4px_hsl(45,100%,50%,0.1)]" />
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-primary/30" />
    </div>
  </div>
);

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
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

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

      {/* Grid */}
      <div ref={gridRef} className="max-w-5xl mx-auto mb-10 md:mb-14">
        {/* Desktop: 3-col with bold arrows */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-0 items-stretch">
          {/* Row 1 */}
          {row1.map((m, i) => (
            <>
              <ModuleCard key={m.num} m={m} index={i} isVisible={isVisible} />
              {i < 2 && (
                <HorizontalArrow
                  isVisible={isVisible}
                  delay={i * 150 + 100}
                />
              )}
            </>
          ))}

          {/* Row connector */}
          <VerticalConnector isVisible={isVisible} delay={450} />

          {/* Row 2 */}
          {row2.map((m, i) => (
            <>
              <ModuleCard
                key={m.num}
                m={m}
                index={i + 3}
                isVisible={isVisible}
              />
              {i < 2 && (
                <HorizontalArrow
                  isVisible={isVisible}
                  delay={(i + 3) * 150 + 100}
                />
              )}
            </>
          ))}
        </div>

        {/* Mobile / Tablet: stacked with vertical connectors */}
        <div className="flex flex-col lg:hidden">
          {modules.map((m, i) => (
            <div key={m.num}>
              <ModuleCard m={m} index={i} isVisible={isVisible} />
              {i < modules.length - 1 && (
                <MobileConnector
                  isVisible={isVisible}
                  delay={i * 150 + 100}
                />
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
