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

/** Horizontal flow arrow with animated pulse */
const FlowArrow = ({
  active,
  delay,
}: {
  active: boolean;
  delay: number;
}) => (
  <div
    className="hidden lg:flex items-center justify-center -mx-1 self-center relative"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Main line */}
    <div
      className="w-8 h-[2px] rounded-full transition-all duration-500"
      style={{
        background: active
          ? "linear-gradient(90deg, hsl(45 100% 50% / 0.8), hsl(45 100% 50% / 0.4))"
          : "hsl(45 100% 50% / 0.15)",
        boxShadow: active
          ? "0 0 12px hsl(45 100% 50% / 0.4), 0 0 4px hsl(45 100% 50% / 0.2)"
          : "none",
      }}
    />
    {/* Arrow head */}
    <div
      className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] rotate-180 transition-all duration-500"
      style={{
        borderRightColor: active
          ? "hsl(45 100% 50% / 0.8)"
          : "hsl(45 100% 50% / 0.2)",
        filter: active ? "drop-shadow(0 0 6px hsl(45 100% 50% / 0.5))" : "none",
      }}
    />
    {/* Traveling pulse on active */}
    {active && (
      <div
        className="absolute inset-0 flex items-center"
        style={{ animation: "flowPulse 1s ease-out forwards" }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(45 100% 60% / 0.8), transparent)",
            filter: "blur(2px)",
          }}
        />
      </div>
    )}
  </div>
);

/** Vertical row connector with animated state */
const RowConnector = ({ active }: { active: boolean }) => (
  <div className="hidden lg:flex col-span-full justify-center py-2">
    <div className="flex flex-col items-center relative">
      <div
        className="h-8 w-[2px] rounded-full transition-all duration-500"
        style={{
          background: active
            ? "linear-gradient(180deg, hsl(45 100% 50% / 0.7), hsl(45 100% 50% / 0.3))"
            : "hsl(45 100% 50% / 0.12)",
          boxShadow: active
            ? "0 0 10px hsl(45 100% 50% / 0.3)"
            : "none",
        }}
      />
      <div
        className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] transition-all duration-500"
        style={{
          borderTopColor: active
            ? "hsl(45 100% 50% / 0.7)"
            : "hsl(45 100% 50% / 0.15)",
          filter: active ? "drop-shadow(0 0 6px hsl(45 100% 50% / 0.4))" : "none",
        }}
      />
    </div>
  </div>
);

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
      className="group relative rounded-2xl p-5 md:p-7 transition-all duration-400 cursor-default"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isActive
            ? "translateY(-4px) scale(1.02)"
            : "translateY(0) scale(1)"
          : "translateY(24px) scale(0.97)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease, border-color 0.4s ease, background 0.4s ease`,
        background: isActive
          ? "linear-gradient(135deg, hsl(0 0% 13% / 0.95), hsl(0 0% 10% / 0.95))"
          : isInFlow
            ? "hsl(0 0% 12% / 0.9)"
            : "hsl(0 0% 11% / 0.8)",
        border: isActive
          ? "1.5px solid hsl(45 100% 50% / 0.5)"
          : isInFlow
            ? "1px solid hsl(45 100% 50% / 0.2)"
            : "1px solid hsl(0 0% 20% / 0.5)",
        borderRadius: "1rem",
        boxShadow: isActive
          ? "0 0 40px hsl(45 100% 50% / 0.12), 0 8px 32px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(45 100% 50% / 0.08)"
          : isInFlow
            ? "0 0 20px hsl(45 100% 50% / 0.06), 0 4px 16px hsl(0 0% 0% / 0.2)"
            : "0 2px 8px hsl(0 0% 0% / 0.15)",
      }}
    >
      {/* Large step number */}
      <span
        className="absolute top-3 left-4 text-3xl md:text-4xl font-black font-mono tracking-tighter select-none leading-none transition-all duration-500"
        style={{
          color: isActive
            ? "hsl(45 100% 50% / 0.18)"
            : isInFlow
              ? "hsl(45 100% 50% / 0.12)"
              : "hsl(45 100% 50% / 0.08)",
        }}
      >
        {m.num}
      </span>

      {/* Accent bar */}
      <div
        className="h-[2px] mb-4 rounded-full transition-all duration-400"
        style={{
          width: isActive ? "3.5rem" : "2rem",
          background: isActive
            ? "linear-gradient(90deg, hsl(45 100% 50% / 0.9), hsl(45 100% 50% / 0.4))"
            : isInFlow
              ? "hsl(45 100% 50% / 0.6)"
              : "hsl(45 100% 50% / 0.5)",
          boxShadow: isActive ? "0 0 12px hsl(45 100% 50% / 0.3)" : "none",
        }}
      />

      {/* Inline step badge */}
      <span
        className="inline-block text-[10px] md:text-xs font-mono tracking-widest mb-2 transition-colors duration-400"
        style={{
          color: isActive
            ? "hsl(45 100% 50% / 0.7)"
            : isInFlow
              ? "hsl(45 100% 50% / 0.5)"
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

      {/* Active indicator glow line at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-500"
        style={{
          width: isActive ? "60%" : "0%",
          background: "linear-gradient(90deg, transparent, hsl(45 100% 50% / 0.5), transparent)",
          opacity: isActive ? 1 : 0,
        }}
      />
    </div>
  );
};

/** Mobile card with tap interaction */
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
      className="relative rounded-2xl p-5 transition-all duration-400 cursor-default"
      onClick={onTap}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isTapped ? "scale(1.01)" : "translateY(0)"
          : "translateY(20px) scale(0.97)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms, box-shadow 0.4s ease, border-color 0.4s ease`,
        background: isTapped
          ? "hsl(0 0% 13% / 0.95)"
          : "hsl(0 0% 11% / 0.8)",
        border: isTapped
          ? "1.5px solid hsl(45 100% 50% / 0.4)"
          : "1px solid hsl(0 0% 20% / 0.5)",
        borderRadius: "1rem",
        boxShadow: isTapped
          ? "0 0 30px hsl(45 100% 50% / 0.1), 0 4px 20px hsl(0 0% 0% / 0.25)"
          : "0 2px 8px hsl(0 0% 0% / 0.15)",
      }}
    >
      <span
        className="absolute top-3 left-4 text-3xl font-black font-mono tracking-tighter select-none leading-none transition-colors duration-400"
        style={{ color: isTapped ? "hsl(45 100% 50% / 0.16)" : "hsl(45 100% 50% / 0.08)" }}
      >
        {m.num}
      </span>

      <div
        className="h-[2px] mb-4 rounded-full transition-all duration-400"
        style={{
          width: isTapped ? "3rem" : "2rem",
          background: isTapped
            ? "linear-gradient(90deg, hsl(45 100% 50% / 0.8), hsl(45 100% 50% / 0.3))"
            : "hsl(45 100% 50% / 0.5)",
        }}
      />

      <span
        className="inline-block text-[10px] font-mono tracking-widest mb-2 transition-colors duration-300"
        style={{ color: isTapped ? "hsl(45 100% 50% / 0.6)" : "hsl(45 100% 50% / 0.4)" }}
      >
        STEP {m.num}
      </span>

      <h3 className="text-xl font-bold text-foreground mb-2">{m.title}</h3>
      <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">{m.desc}</p>
    </div>
  );
};

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
          // Trigger mobile auto-flow animation after cards appear
          setTimeout(() => setMobileAutoFlow(true), 800);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  // When hovering a card, activate flow from that card to CTA
  const handleCardHover = useCallback((index: number) => {
    setHoveredIndex(index);
    // Activate CTA glow after a cascade delay
    const remainingCards = 6 - index;
    setTimeout(() => setCtaGlow(true), remainingCards * 150);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredIndex(null);
    setCtaGlow(false);
  }, []);

  // Check if a card is "in the flow" (at or after the hovered card)
  const isInFlow = (index: number) => hoveredIndex !== null && index >= hoveredIndex;
  const isActive = (index: number) => hoveredIndex === index;

  // Check if an arrow/connector is active (between two cards that are both in flow)
  const isArrowActive = (afterIndex: number) =>
    hoveredIndex !== null && afterIndex >= hoveredIndex;

  const row1 = modules.slice(0, 3);
  const row2 = modules.slice(3, 6);

  return (
    <SectionWrapper className="py-12 md:py-20 lg:py-28">
      {/* Keyframes for flow pulse */}
      <style>{`
        @keyframes flowPulse {
          0% { transform: translateX(-100%); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateX(400%); opacity: 0; }
        }
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 20px hsl(45 100% 50% / 0.15), 0 0 60px hsl(45 100% 50% / 0.05); }
          50% { box-shadow: 0 0 30px hsl(45 100% 50% / 0.25), 0 0 80px hsl(45 100% 50% / 0.1); }
        }
        @keyframes mobileFlowPulse {
          0% { transform: scaleY(0); opacity: 0; transform-origin: top; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0.3; }
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
                <FlowArrow
                  active={isArrowActive(i)}
                  delay={i * 120 + 60}
                />
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
                <FlowArrow
                  active={isArrowActive(i + 3)}
                  delay={(i + 3) * 120 + 60}
                />
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
                    className="w-[2px] rounded-full transition-all duration-700"
                    style={{
                      height: "1.25rem",
                      background: mobileAutoFlow
                        ? "linear-gradient(180deg, hsl(45 100% 50% / 0.35), hsl(45 100% 50% / 0.1))"
                        : "hsl(45 100% 50% / 0.1)",
                      boxShadow: mobileAutoFlow
                        ? "0 0 6px hsl(45 100% 50% / 0.15)"
                        : "none",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Flow-to-CTA connector (desktop) */}
      <div className="hidden lg:flex justify-center -mt-6 mb-4">
        <div className="flex flex-col items-center">
          <div
            className="w-[2px] rounded-full transition-all duration-500"
            style={{
              height: "2rem",
              background: ctaGlow
                ? "linear-gradient(180deg, hsl(45 100% 50% / 0.6), hsl(45 100% 50% / 0.2))"
                : "hsl(45 100% 50% / 0.1)",
              boxShadow: ctaGlow ? "0 0 8px hsl(45 100% 50% / 0.2)" : "none",
            }}
          />
          <div
            className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] transition-all duration-500"
            style={{
              borderTopColor: ctaGlow
                ? "hsl(45 100% 50% / 0.6)"
                : "hsl(45 100% 50% / 0.12)",
              filter: ctaGlow ? "drop-shadow(0 0 6px hsl(45 100% 50% / 0.3))" : "none",
            }}
          />
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
              ? "0 0 30px hsl(45 100% 50% / 0.25), 0 0 60px hsl(45 100% 50% / 0.1)"
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
