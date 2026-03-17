import { useEffect, useRef, useState, useCallback } from "react";
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

/* ─── Thick horizontal flow arrow with traveling beam ─── */
const FlowArrow = ({ active }: { active: boolean }) => (
  <div className="hidden lg:flex items-center justify-center -mx-2 self-center relative w-14">
    {/* Track (always visible) */}
    <div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[4px] rounded-full transition-all duration-300"
      style={{
        background: active
          ? "linear-gradient(270deg, hsl(45 100% 50% / 0.9), hsl(45 100% 45% / 0.5))"
          : "hsl(0 0% 25% / 0.5)",
        boxShadow: active
          ? "0 0 18px hsl(45 100% 50% / 0.5), 0 0 6px hsl(45 100% 50% / 0.3)"
          : "none",
      }}
    />
    {/* Arrowhead */}
    <div
      className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[10px] rotate-180 transition-all duration-300"
      style={{
        borderLeftColor: active
          ? "hsl(45 100% 50% / 0.95)"
          : "hsl(0 0% 30% / 0.5)",
        filter: active
          ? "drop-shadow(0 0 8px hsl(45 100% 50% / 0.6))"
          : "none",
      }}
    />
    {/* Traveling beam */}
    {active && (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ direction: "ltr" }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-[6px] rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(45 100% 65% / 0.95), hsl(45 100% 50% / 0.7), transparent)",
            filter: "blur(1px)",
            animation: "arrowBeamRTL 1.2s ease-in-out infinite",
          }}
        />
      </div>
    )}
  </div>
);

/* ─── Thick vertical row connector ─── */
const RowConnector = ({ active }: { active: boolean }) => (
  <div className="hidden lg:flex col-span-full justify-center py-3">
    <div className="flex flex-col items-center relative">
      {/* Track */}
      <div
        className="w-[4px] rounded-full transition-all duration-400"
        style={{
          height: "2.5rem",
          background: active
            ? "linear-gradient(180deg, hsl(45 100% 50% / 0.85), hsl(45 100% 45% / 0.4))"
            : "hsl(0 0% 25% / 0.4)",
          boxShadow: active
            ? "0 0 16px hsl(45 100% 50% / 0.45), 0 0 6px hsl(45 100% 50% / 0.25)"
            : "none",
        }}
      />
      {/* Arrowhead */}
      <div
        className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] transition-all duration-400"
        style={{
          borderTopColor: active
            ? "hsl(45 100% 50% / 0.9)"
            : "hsl(0 0% 30% / 0.4)",
          filter: active
            ? "drop-shadow(0 0 8px hsl(45 100% 50% / 0.5))"
            : "none",
        }}
      />
      {/* Traveling beam vertical */}
      {active && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[6px] h-6 rounded-full"
            style={{
              background: "linear-gradient(180deg, transparent, hsl(45 100% 65% / 0.9), transparent)",
              filter: "blur(1px)",
              animation: "arrowBeamDown 1.2s ease-in-out infinite",
            }}
          />
        </div>
      )}
    </div>
  </div>
);

/* ─── Desktop card with animated tracing border ─── */
const ModuleCard = ({
  m,
  index,
  isVisible,
  isActive,
  isInFlow,
  onHover,
  onLeave,
}: {
  m: (typeof modules)[0];
  index: number;
  isVisible: boolean;
  isActive: boolean;
  isInFlow: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const delay = index * 120;

  return (
    <div
      className="group relative cursor-default"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isActive
            ? "translateY(-6px) scale(1.03)"
            : "translateY(0) scale(1)"
          : "translateY(24px) scale(0.97)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)`,
      }}
    >
      {/* Animated tracing border — conic gradient spinning */}
      <div
        className="absolute -inset-[2px] rounded-2xl transition-opacity duration-300 overflow-hidden"
        style={{
          opacity: isActive ? 1 : 0,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "conic-gradient(from var(--border-angle, 0deg), transparent 0%, hsl(45 100% 50% / 0.9) 15%, hsl(45 100% 60% / 1) 25%, transparent 40%, transparent 60%, hsl(45 100% 50% / 0.6) 75%, transparent 90%)",
            animation: isActive ? "borderTrace 1.5s linear infinite" : "none",
            filter: "blur(0.5px)",
          }}
        />
        {/* Glow layer behind the tracing */}
        <div
          className="absolute inset-0"
          style={{
            background: "conic-gradient(from var(--border-angle, 0deg), transparent 0%, hsl(45 100% 50% / 0.3) 15%, transparent 35%, transparent 65%, hsl(45 100% 50% / 0.2) 80%, transparent 95%)",
            animation: isActive ? "borderTrace 1.5s linear infinite" : "none",
            filter: "blur(6px)",
          }}
        />
      </div>

      {/* Inner card */}
      <div
        className="relative rounded-2xl p-5 md:p-7 transition-all duration-400"
        style={{
          background: isActive
            ? "linear-gradient(135deg, hsl(0 0% 13% / 0.98), hsl(0 0% 9% / 0.98))"
            : isInFlow
              ? "hsl(0 0% 12% / 0.95)"
              : "hsl(0 0% 11% / 0.8)",
          border: isActive
            ? "2px solid hsl(45 100% 50% / 0.7)"
            : isInFlow
              ? "1.5px solid hsl(45 100% 50% / 0.35)"
              : "1px solid hsl(0 0% 22% / 0.6)",
          borderRadius: "1rem",
          boxShadow: isActive
            ? "0 0 50px hsl(45 100% 50% / 0.2), 0 0 100px hsl(45 100% 50% / 0.08), 0 12px 40px hsl(0 0% 0% / 0.4), inset 0 1px 0 hsl(45 100% 50% / 0.1)"
            : isInFlow
              ? "0 0 30px hsl(45 100% 50% / 0.08), 0 6px 24px hsl(0 0% 0% / 0.25)"
              : "0 2px 8px hsl(0 0% 0% / 0.15)",
          transition: "background 0.4s ease, border-color 0.3s ease, box-shadow 0.5s ease",
        }}
      >
        {/* Large step number */}
        <span
          className="absolute top-3 left-4 text-3xl md:text-4xl font-black font-mono tracking-tighter select-none leading-none transition-all duration-500"
          style={{
            color: isActive
              ? "hsl(45 100% 50% / 0.22)"
              : isInFlow
                ? "hsl(45 100% 50% / 0.14)"
                : "hsl(45 100% 50% / 0.08)",
          }}
        >
          {m.num}
        </span>

        {/* Accent bar */}
        <div
          className="h-[3px] mb-4 rounded-full transition-all duration-400"
          style={{
            width: isActive ? "4rem" : isInFlow ? "3rem" : "2rem",
            background: isActive
              ? "linear-gradient(90deg, hsl(45 100% 50% / 1), hsl(45 100% 50% / 0.5))"
              : isInFlow
                ? "hsl(45 100% 50% / 0.65)"
                : "hsl(45 100% 50% / 0.4)",
            boxShadow: isActive
              ? "0 0 16px hsl(45 100% 50% / 0.5), 0 0 4px hsl(45 100% 50% / 0.3)"
              : "none",
          }}
        />

        {/* Inline step badge */}
        <span
          className="inline-block text-[10px] md:text-xs font-mono tracking-widest mb-2 transition-colors duration-400"
          style={{
            color: isActive
              ? "hsl(45 100% 50% / 0.8)"
              : isInFlow
                ? "hsl(45 100% 50% / 0.55)"
                : "hsl(45 100% 50% / 0.4)",
          }}
        >
          STEP {m.num}
        </span>

        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {m.title}
        </h3>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
          {m.desc}
        </p>
      </div>
    </div>
  );
};

/* ─── Mobile card with tap ─── */
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
        transform: isVisible
          ? isTapped ? "scale(1.02)" : "translateY(0)"
          : "translateY(20px) scale(0.97)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      {/* Animated tracing border for tap */}
      <div
        className="absolute -inset-[2px] rounded-2xl transition-opacity duration-300 overflow-hidden"
        style={{ opacity: isTapped ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "conic-gradient(from var(--border-angle, 0deg), transparent 0%, hsl(45 100% 50% / 0.8) 15%, hsl(45 100% 60% / 0.9) 25%, transparent 40%, transparent 65%, hsl(45 100% 50% / 0.5) 80%, transparent 95%)",
            animation: isTapped ? "borderTrace 1.5s linear infinite" : "none",
            filter: "blur(0.5px)",
          }}
        />
      </div>

      <div
        className="relative rounded-2xl p-5 transition-all duration-400"
        style={{
          background: isTapped
            ? "hsl(0 0% 13% / 0.98)"
            : "hsl(0 0% 11% / 0.8)",
          border: isTapped
            ? "2px solid hsl(45 100% 50% / 0.6)"
            : "1px solid hsl(0 0% 22% / 0.5)",
          borderRadius: "1rem",
          boxShadow: isTapped
            ? "0 0 40px hsl(45 100% 50% / 0.15), 0 6px 24px hsl(0 0% 0% / 0.3)"
            : "0 2px 8px hsl(0 0% 0% / 0.15)",
        }}
      >
        <span
          className="absolute top-3 left-4 text-3xl font-black font-mono tracking-tighter select-none leading-none transition-colors duration-400"
          style={{ color: isTapped ? "hsl(45 100% 50% / 0.2)" : "hsl(45 100% 50% / 0.08)" }}
        >
          {m.num}
        </span>

        <div
          className="h-[3px] mb-4 rounded-full transition-all duration-400"
          style={{
            width: isTapped ? "3.5rem" : "2rem",
            background: isTapped
              ? "linear-gradient(90deg, hsl(45 100% 50% / 0.9), hsl(45 100% 50% / 0.4))"
              : "hsl(45 100% 50% / 0.4)",
            boxShadow: isTapped ? "0 0 12px hsl(45 100% 50% / 0.4)" : "none",
          }}
        />

        <span
          className="inline-block text-[10px] font-mono tracking-widest mb-2 transition-colors duration-300"
          style={{ color: isTapped ? "hsl(45 100% 50% / 0.7)" : "hsl(45 100% 50% / 0.4)" }}
        >
          STEP {m.num}
        </span>

        <h3 className="text-xl font-bold text-foreground mb-2">{m.title}</h3>
        <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">{m.desc}</p>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const DeliverablesSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [ctaGlow, setCtaGlow] = useState(false);
  const [mobileTapped, setMobileTapped] = useState<number | null>(null);
  const [mobileAutoFlow, setMobileAutoFlow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setMobileAutoFlow(true), 800);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardHover = useCallback((index: number) => {
    setHoveredIndex(index);
    const remainingCards = 6 - index;
    setTimeout(() => setCtaGlow(true), remainingCards * 200);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredIndex(null);
    setCtaGlow(false);
  }, []);

  const isInFlow = (index: number) => hoveredIndex !== null && index >= hoveredIndex;
  const isActive = (index: number) => hoveredIndex === index;
  const isArrowActive = (afterIndex: number) =>
    hoveredIndex !== null && afterIndex >= hoveredIndex;

  const row1 = modules.slice(0, 3);
  const row2 = modules.slice(3, 6);

  return (
    <SectionWrapper className="py-12 md:py-20 lg:py-28">
      {/* Keyframes */}
      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes borderTrace {
          0% { --border-angle: 0deg; }
          100% { --border-angle: 360deg; }
        }
        @keyframes arrowBeamRTL {
          0% { right: 100%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { right: -30%; opacity: 0; }
        }
        @keyframes arrowBeamDown {
          0% { top: -20%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 30px hsl(45 100% 50% / 0.2), 0 0 80px hsl(45 100% 50% / 0.08); }
          50% { box-shadow: 0 0 50px hsl(45 100% 50% / 0.35), 0 0 120px hsl(45 100% 50% / 0.15); }
        }
      `}</style>

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
                isActive={isActive(i)}
                isInFlow={isInFlow(i)}
                onHover={() => handleCardHover(i)}
                onLeave={handleCardLeave}
              />
              {i < 2 && (
                <FlowArrow active={isArrowActive(i)} />
              )}
            </div>
          ))}

          {/* Row connector */}
          <RowConnector active={isArrowActive(2)} />

          {/* Row 2 */}
          {row2.map((m, i) => (
            <div key={m.num} className="contents">
              <ModuleCard
                m={m}
                index={i + 3}
                isVisible={isVisible}
                isActive={isActive(i + 3)}
                isInFlow={isInFlow(i + 3)}
                onHover={() => handleCardHover(i + 3)}
                onLeave={handleCardLeave}
              />
              {i < 2 && (
                <FlowArrow active={isArrowActive(i + 3)} />
              )}
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
                    className="rounded-full transition-all duration-700 relative"
                    style={{
                      width: "4px",
                      height: "1.5rem",
                      background: (mobileTapped === i || mobileAutoFlow)
                        ? "linear-gradient(180deg, hsl(45 100% 50% / 0.6), hsl(45 100% 50% / 0.15))"
                        : "hsl(0 0% 25% / 0.4)",
                      boxShadow: (mobileTapped === i || mobileAutoFlow)
                        ? "0 0 12px hsl(45 100% 50% / 0.3)"
                        : "none",
                    }}
                  >
                    {/* Arrow tip */}
                    <div
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] transition-all duration-500"
                      style={{
                        borderTopColor: (mobileTapped === i || mobileAutoFlow)
                          ? "hsl(45 100% 50% / 0.6)"
                          : "hsl(0 0% 30% / 0.3)",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Flow-to-CTA connector (desktop) */}
      <div className="hidden lg:flex justify-center -mt-4 mb-5">
        <div className="flex flex-col items-center relative">
          <div
            className="w-[4px] rounded-full transition-all duration-500"
            style={{
              height: "2.5rem",
              background: ctaGlow
                ? "linear-gradient(180deg, hsl(45 100% 50% / 0.85), hsl(45 100% 45% / 0.3))"
                : "hsl(0 0% 25% / 0.3)",
              boxShadow: ctaGlow
                ? "0 0 18px hsl(45 100% 50% / 0.4), 0 0 6px hsl(45 100% 50% / 0.2)"
                : "none",
            }}
          />
          <div
            className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] transition-all duration-500"
            style={{
              borderTopColor: ctaGlow
                ? "hsl(45 100% 50% / 0.9)"
                : "hsl(0 0% 30% / 0.3)",
              filter: ctaGlow
                ? "drop-shadow(0 0 10px hsl(45 100% 50% / 0.5))"
                : "none",
            }}
          />
          {/* Traveling beam */}
          {ctaGlow && (
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute left-1/2 -translate-x-1/2 w-[6px] h-6 rounded-full"
                style={{
                  background: "linear-gradient(180deg, transparent, hsl(45 100% 65% / 0.9), transparent)",
                  filter: "blur(1px)",
                  animation: "arrowBeamDown 1.2s ease-in-out infinite",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Closing line */}
      <p className="text-primary font-black text-xl md:text-3xl lg:text-4xl leading-snug text-center mb-8 md:mb-10 max-w-3xl mx-auto">
        ככה מפסיקים להתחיל מחדש —
        <br />
        ובונים משהו שבאמת מחזיק.
      </p>

      {/* CTA */}
      <div ref={ctaRef} className="flex flex-col items-center gap-2">
        <Button
          variant="gold"
          size="lg"
          className="text-base md:text-lg px-8 py-4 md:px-12 md:py-5 transition-all duration-500"
          style={{
            boxShadow: ctaGlow
              ? "0 0 40px hsl(45 100% 50% / 0.3), 0 0 80px hsl(45 100% 50% / 0.12)"
              : undefined,
            animation: ctaGlow ? "ctaPulse 2s ease-in-out infinite" : "none",
          }}
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
