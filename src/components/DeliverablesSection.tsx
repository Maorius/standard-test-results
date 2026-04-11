import { useEffect, useRef, useState, useCallback } from "react";
import SectionWrapper from "./SectionWrapper";
import { Button } from "./ui/button";
import { scrollToForm } from "../lib/landing-utils";

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
    desc: "לא תפריט שמתפרק אחרי שבוע \nאלא דרך אכילה שאתה באמת יכול לחיות איתה.",
  },
  {
    num: "04",
    title: "אימונים שמתעדכנים איתך",
    desc: "תוכנית מדויקת לרמה שלך,\nשמתקדמת יחד איתך ולא נשארת קפואה במקום.",
  },
  {
    num: "05",
    title: "שיחה שבועית",
    desc: "כל שבוע עוצרים, בודקים, ומתקנים \nכדי שלא תישאר לבד בתוך התהליך.",
  },
  {
    num: "06",
    title: "זמינות עקבית",
    desc: "אתה לא נשאר לבד בין מפגש למפגש.\nיש לך עם מי לדבר גם ברגעים שבהם הכי קל ליפול.",
  },
];

/* ─── Horizontal flow arrow (static dim) ─── */
const FlowArrow = () => (
  <div className="hidden lg:flex items-center justify-center -mx-2 self-center relative w-14">
    <div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[4px] rounded-full"
      style={{ background: "hsl(0 0% 25% / 0.5)" }}
    />
    <div
      className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[10px] rotate-180"
      style={{ borderLeftColor: "hsl(0 0% 30% / 0.5)" }}
    />
  </div>
);

/* ─── Vertical row connector (static dim) ─── */
const RowConnector = () => (
  <div className="hidden lg:flex col-span-full justify-center py-3">
    <div className="flex flex-col items-center">
      <div className="w-[4px] rounded-full" style={{ height: "2.5rem", background: "hsl(0 0% 25% / 0.4)" }} />
      <div
        className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px]"
        style={{ borderTopColor: "hsl(0 0% 30% / 0.4)" }}
      />
    </div>
  </div>
);

/* ─── Desktop card with gold hover ─── */
const ModuleCard = ({
  m,
  index,
  isVisible,
  isHovered,
  onHover,
  onLeave,
}: {
  m: (typeof modules)[0];
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const delay = index * 120;

  return (
    <div
      className="relative cursor-default"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      <div
        className="relative rounded-2xl p-5 md:p-7 flex flex-col min-h-[220px]"
        style={{
          background: isHovered ? "linear-gradient(135deg, hsl(45 100% 50%), hsl(40 100% 45%))" : "hsl(0 0% 11% / 0.8)",
          border: isHovered ? "1.5px solid hsl(45 100% 55%)" : "1px solid hsl(0 0% 22% / 0.6)",
          borderRadius: "1rem",
          boxShadow: isHovered
            ? "0 8px 40px hsl(45 100% 50% / 0.3), 0 0 60px hsl(45 100% 50% / 0.1)"
            : "0 2px 8px hsl(0 0% 0% / 0.15)",
          transition: "all 0.4s ease",
        }}
      >
        {/* Large step number */}
        <span
          className="absolute top-3 left-4 text-3xl md:text-4xl font-black font-mono tracking-tighter select-none leading-none"
          style={{
            color: isHovered ? "hsl(0 0% 5% / 0.15)" : "hsl(45 100% 50% / 0.08)",
            transition: "color 0.4s ease",
          }}
        >
          {m.num}
        </span>

        {/* Accent bar */}
        <div
          className="h-[3px] mb-4 rounded-full w-8"
          style={{
            background: isHovered ? "hsl(0 0% 5% / 0.4)" : "hsl(45 100% 50% / 0.4)",
            transition: "background 0.4s ease",
          }}
        />

        {/* Step badge */}
        <span
          className="inline-block text-[10px] md:text-xs font-mono tracking-widest mb-2"
          style={{
            color: isHovered ? "hsl(0 0% 5% / 0.6)" : "hsl(45 100% 50% / 0.4)",
            transition: "color 0.4s ease",
          }}
        >
          STEP {m.num}
        </span>

        <h3
          className="text-xl md:text-2xl font-bold mb-2"
          style={{
            color: isHovered ? "hsl(0 0% 5%)" : "hsl(var(--foreground))",
            transition: "color 0.4s ease",
          }}
        >
          {m.title}
        </h3>
        <p
          className="text-base md:text-lg leading-relaxed whitespace-pre-line"
          style={{
            color: isHovered ? "hsl(0 0% 5% / 0.75)" : "hsl(var(--muted-foreground))",
            transition: "color 0.4s ease",
          }}
        >
          {m.desc}
        </p>
      </div>
    </div>
  );
};

/* ─── Mobile card with gold tap ─── */
const MobileModuleCard = ({
  m,
  index,
  isVisible,
  isTapped,
  onTap,
}: {
  m: (typeof modules)[0];
  index: number;
  isVisible: boolean;
  isTapped: boolean;
  onTap: () => void;
}) => {
  const delay = index * 100;

  return (
    <div
      className="relative cursor-default"
      onClick={onTap}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px) scale(0.97)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      <div
        className="relative rounded-2xl p-5 flex flex-col min-h-[200px]"
        style={{
          background: isTapped ? "linear-gradient(135deg, hsl(45 100% 50%), hsl(40 100% 45%))" : "hsl(0 0% 11% / 0.8)",
          border: isTapped ? "1.5px solid hsl(45 100% 55%)" : "1px solid hsl(0 0% 22% / 0.5)",
          borderRadius: "1rem",
          boxShadow: isTapped
            ? "0 8px 40px hsl(45 100% 50% / 0.3), 0 0 60px hsl(45 100% 50% / 0.1)"
            : "0 2px 8px hsl(0 0% 0% / 0.15)",
          transition: "all 0.4s ease",
        }}
      >
        <span
          className="absolute top-3 left-4 text-3xl font-black font-mono tracking-tighter select-none leading-none"
          style={{
            color: isTapped ? "hsl(0 0% 5% / 0.15)" : "hsl(45 100% 50% / 0.08)",
            transition: "color 0.4s ease",
          }}
        >
          {m.num}
        </span>

        <div
          className="h-[3px] mb-4 rounded-full w-8"
          style={{
            background: isTapped ? "hsl(0 0% 5% / 0.4)" : "hsl(45 100% 50% / 0.4)",
            transition: "background 0.4s ease",
          }}
        />

        <span
          className="inline-block text-[10px] font-mono tracking-widest mb-2"
          style={{
            color: isTapped ? "hsl(0 0% 5% / 0.6)" : "hsl(45 100% 50% / 0.4)",
            transition: "color 0.4s ease",
          }}
        >
          STEP {m.num}
        </span>

        <h3
          className="text-xl font-bold mb-2"
          style={{
            color: isTapped ? "hsl(0 0% 5%)" : "hsl(var(--foreground))",
            transition: "color 0.4s ease",
          }}
        >
          {m.title}
        </h3>
        <p
          className="text-base leading-relaxed whitespace-pre-line"
          style={{
            color: isTapped ? "hsl(0 0% 5% / 0.75)" : "hsl(var(--muted-foreground))",
            transition: "color 0.4s ease",
          }}
        >
          {m.desc}
        </p>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const DeliverablesSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileTapped, setMobileTapped] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
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
        מרגע שנכנסת זה מה שקורה.
      </h2>
      <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl text-center max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
        לא עוד ניסיון שמתפרק אחרי שבוע.
        <br />
        אלא מערכת עבודה שנבנית סביבך ומחזיקה אותך בתוכה.
      </p>

      {/* Overline */}
      <p className="text-muted-foreground/60 text-sm md:text-base text-center mb-8 md:mb-12 tracking-wide">
        לא ״מה כלול״. מה מחזיק את זה בפועל.
      </p>

      {/* Module Grid */}
      <div ref={gridRef} className="max-w-5xl mx-auto mb-10 md:mb-14">
        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-0 items-stretch">
          {/* Row 1 */}
          {row1.map((m, i) => (
            <div key={m.num} className="contents">
              <ModuleCard
                m={m}
                index={i}
                isVisible={isVisible}
                isHovered={hoveredIndex === i}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
              />
              {i < 2 && <FlowArrow />}
            </div>
          ))}

          {/* Row connector */}
          <RowConnector />

          {/* Row 2 */}
          {row2.map((m, i) => (
            <div key={m.num} className="contents">
              <ModuleCard
                m={m}
                index={i + 3}
                isVisible={isVisible}
                isHovered={hoveredIndex === i + 3}
                onHover={() => setHoveredIndex(i + 3)}
                onLeave={() => setHoveredIndex(null)}
              />
              {i < 2 && <FlowArrow />}
            </div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {modules.map((m, i) => (
            <div key={m.num} className="contents sm:block">
              <MobileModuleCard
                m={m}
                index={i}
                isVisible={isVisible}
                isTapped={mobileTapped === i}
                onTap={() => setMobileTapped(mobileTapped === i ? null : i)}
              />
              {/* Vertical connector on mobile */}
              {i < modules.length - 1 && (
                <div className="flex sm:hidden justify-center -my-0.5">
                  <div
                    className="rounded-full"
                    style={{
                      width: "4px",
                      height: "1.5rem",
                      background: "hsl(0 0% 25% / 0.4)",
                    }}
                  >
                    <div
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px]"
                      style={{ borderTopColor: "hsl(0 0% 30% / 0.3)" }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Closing line */}
      <p className="text-primary font-black text-xl md:text-3xl lg:text-4xl leading-snug text-center mb-8 md:mb-10 max-w-3xl mx-auto">
        ככה מפסיקים להתחיל מחדש
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
        <span className="text-muted-foreground text-xs md:text-sm">שיחת איפיון 5-10 דק • ללא התחייבות</span>
      </div>
    </SectionWrapper>
  );
};

export default DeliverablesSection;
