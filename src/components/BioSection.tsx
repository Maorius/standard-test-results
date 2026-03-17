import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const trustBullets = [
  "עבר בעצמו שינוי אמיתי, לא רק למד עליו",
  "בנה דרך שמחזיקה בלי קיצון ובלי לוותר על החיים",
  "היום מלווה גברים לבנות גוף, ביטחון ונוכחות",
];

/* ─────────────────────────────────────────────
   Slide data — keeps JSX lean
───────────────────────────────────────────── */
const slides = [
  {
    img: "/images/matan-childhood.jpg",
    alt: "מתן בילדותו",
    caption: "פעם זה היה אני.",
    paragraphs: [
      <>
        <span className="text-foreground font-bold text-lg md:text-xl lg:text-2xl">אני מתן.</span>
        <br />
        <span className="text-foreground font-semibold">כל הילדות הייתי הילד השמן</span> זה שנשאר הרבה פעמים לבד,
        ולפעמים אפילו מוחרם.
      </>,
      <>
        מבחוץ זה היה משקל.
        <br />
        מבפנים זה היה הרבה יותר מזה: בושה, חוסר ביטחון, ותחושה שאתה תקוע בתוך גרסה של עצמך שלא באמת משקפת מי שאתה יכול
        להיות.
      </>,
      <>
        באותם ימים, להשתנות הרגיש כמעט בלתי אפשרי.
        <br />
        אפילו לרוץ או לעלות במדרגות היה כבד.
        <br />
        והרעיון של ״להיכנס לכושר״ הרגיש כמו לוותר על כל מה שאני אוהב.
      </>,
    ],
  },
  {
    img: "/images/matan-glowup.jpg",
    alt: "מתן היום",
    caption: "השינוי לא קרה ביום הוא נבנה בתהליך.",
    paragraphs: [
      <>
        השינוי האמיתי התחיל כשהבנתי ש
        <span className="text-foreground font-semibold">לא צריך לחיות על קיצון כדי להשתנות.</span>
      </>,
      <>
        לא צריך לסבול כדי להתקדם.
        <br />
        צריך דרך שאפשר להחזיק בגוף, בהרגלים, ובראש.
      </>,
      <>
        היום אני כבר לא אותו ילד.
        <br />
        אני חזק יותר, בטוח יותר, ואוהב את איך שאני נראה בלי לוותר על החיים עצמם.
      </>,
      <>
        והיום אני עוזר לגברים לעשות את אותו מעבר:
        <br />
        להרגיש טוב יותר בגוף שלהם, להפסיק לחיות במבוכה, ולבנות נוכחות שהם מרגישים ראויים לה.
      </>,
    ],
  },
];

/* ─────────────────────────────────────────────
   Helper — clamp a number between lo and hi
───────────────────────────────────────────── */
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ─────────────────────────────────────────────
   Reusable slide layout
───────────────────────────────────────────── */
const SlideContent = ({
  slide,
  style,
  className,
  imgClassName,
}: {
  slide: (typeof slides)[0];
  style?: React.CSSProperties;
  className?: string;
  imgClassName?: string;
}) => (
  <div
    className={cn("w-full grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start", className)}
    style={style}
  >
    {/* Image */}
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-border/50",
          imgClassName ?? "w-56 md:w-72 lg:w-80",
        )}
      >
        <img src={slide.img} alt={slide.alt} className="w-full h-auto block" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
      </div>
      <p className="text-muted-foreground text-sm mt-3 italic text-center">"{slide.caption}"</p>
    </div>

    {/* Text */}
    <div className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed space-y-5">
      {slide.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const BioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const [sectionVisible, setSectionVisible] = useState(false);
  // 0 = fully on slide 1 · 1 = fully on slide 2
  const [slideProgress, setSlideProgress] = useState(0);

  /* ── Entrance animation observer ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Scroll-progress driver ── */
  useEffect(() => {
    const handleScroll = () => {
      const track = scrollTrackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const trackH = track.offsetHeight;
      const vh = window.innerHeight;
      const scrolled = -rect.top; // px scrolled into the track
      const scrollable = trackH - vh; // total scrollable distance
      setSlideProgress(clamp(scrolled / scrollable, 0, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // seed on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Derive per-slide opacity + vertical offset from progress ──
   *
   *  slide 1: fully visible 0 → 0.35, fades out 0.35 → 0.6
   *  slide 2: invisible until 0.4, fades in 0.4 → 0.65, fully visible after
   *
   *  A small translateY gives a cinematic "lift" feel as each slide exits/enters.
   */
  const s1Opacity = clamp(1 - (slideProgress - 0.35) / 0.25, 0, 1);
  const s1TranslateY = clamp((slideProgress - 0.35) / 0.25, 0, 1) * -24;

  const s2Opacity = clamp((slideProgress - 0.4) / 0.25, 0, 1);
  const s2TranslateY = clamp(1 - (slideProgress - 0.4) / 0.25, 0, 1) * 24;

  const activeDot = slideProgress >= 0.5 ? 1 : 0;

  return (
    /*
     * IMPORTANT: NO overflow-hidden on this <section>.
     * position:sticky breaks the moment any ancestor carries overflow:hidden.
     * The portrait's bottom-fade uses maskImage, not overflow clipping — safe.
     */
    <section ref={sectionRef} className="relative px-5 pt-20 md:pt-28 lg:pt-36">
      <div className="container mx-auto max-w-6xl">
        {/* ══════════════════════════════════════════
            1. BIO TITLE
        ══════════════════════════════════════════ */}
        <div
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-700",
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
            אני לא מלמד משהו <span className="text-gold-gradient">שלא חייתי בעצמי.</span>
          </h2>
        </div>

        {/* ══════════════════════════════════════════
            2. PORTRAIT CIRCLE — emerging from ring
        ══════════════════════════════════════════ */}
        <div
          className={cn(
            "flex flex-col items-center mb-14 md:mb-20 transition-all duration-1000 delay-200",
            sectionVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          )}
        >
          {/* Outer wrapper taller than the circle so portrait can rise above it */}
          <div className="relative w-72 md:w-[22rem] lg:w-[26rem] h-[360px] md:h-[420px] lg:h-[500px] mb-10 md:mb-12">
            {/* z-0 – glow bloom anchored to circle area */}
            <div className="absolute bottom-0 inset-x-0 h-72 md:h-[22rem] lg:h-[26rem] rounded-full bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl scale-125 z-0 pointer-events-none" />

            {/* z-10 – portrait anchored bottom, emerges freely upward */}
            <img
              src="/images/matan-bio.png"
              alt="מתן ברוך"
              className={cn(
                "absolute bottom-0 w-full h-auto object-contain z-10",
                sectionVisible ? "opacity-100" : "opacity-0",
              )}
              style={{
                left: "50%",
                transform: sectionVisible ? "translateX(-50%) translateY(0px)" : "translateX(-50%) translateY(20px)",
                transition: "opacity 1000ms 300ms, transform 1000ms 300ms",
                maskImage: "linear-gradient(to top, transparent 0%, black 10%, black 100%)",
                WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 10%, black 100%)",
              }}
            />

            {/* z-20 – ring frame + inner shadow, in front of portrait at intersection */}
            <div className="absolute bottom-0 inset-x-0 h-72 md:h-[22rem] lg:h-[26rem] z-20 pointer-events-none">
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 shadow-[0_0_60px_hsl(45,100%,50%,0.10)]" />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_-40px_60px_rgba(0,0,0,0.55)]" />
            </div>
          </div>

          {/* Trust bullets */}
          <div className="flex flex-col items-center gap-3 md:gap-4">
            {trustBullets.map((bullet, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 transition-all duration-700",
                  sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
                style={{ transitionDelay: `${800 + i * 150}ms` }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground text-base md:text-lg font-medium">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. STICKY SCROLL TRACK — desktop (md+)
          300vh = enter · dwell slide 1 · transition · dwell slide 2
      ══════════════════════════════════════════ */}
      <div ref={scrollTrackRef} className="hidden md:block" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl w-full relative">
            {/* Slide 1 — childhood */}
            <SlideContent
              slide={slides[0]}
              className="absolute inset-0"
              style={{
                opacity: s1Opacity,
                transform: `translateY(${s1TranslateY}px)`,
                pointerEvents: activeDot === 0 ? "auto" : "none",
              }}
            />

            {/* Slide 2 — glowup */}
            <SlideContent
              slide={slides[1]}
              className="absolute inset-0"
              imgClassName="w-56 md:w-[36rem] lg:w-[40rem]"
              style={{
                opacity: s2Opacity,
                transform: `translateY(${s2TranslateY}px)`,
                pointerEvents: activeDot === 1 ? "auto" : "none",
              }}
            />

            {/* Invisible spacer so the container holds natural height */}
            <SlideContent slide={slides[0]} className="invisible" aria-hidden />
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-primary transition-all duration-300 ease-out"
                style={{
                  width: activeDot === i ? "2rem" : "0.5rem",
                  opacity: activeDot === i ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3b. MOBILE FALLBACK — simple stacked slides
      ══════════════════════════════════════════ */}
      <div className="md:hidden container mx-auto max-w-6xl space-y-16 px-5 py-10">
        {slides.map((slide, i) => (
          <SlideContent key={i} slide={slide} imgClassName={i === 1 ? "w-72 sm:w-80" : undefined} />
        ))}
      </div>

      {/* ══════════════════════════════════════════
          4. CLOSING LINE + CTA
      ══════════════════════════════════════════ */}
      <div className="container mx-auto max-w-6xl px-5 md:px-8 lg:px-16 pb-20 md:pb-28 lg:pb-36">
        <div className="text-center mt-14 md:mt-20 mb-10 md:mb-14">
          <p className="text-foreground text-lg md:text-2xl lg:text-3xl font-bold leading-snug max-w-2xl mx-auto">
            כי בסוף זה לא רק לרדת במשקל או להתחטב
            <br />
            <span className="text-primary">זה להפסיק לחיות קטן בתוך הגוף של עצמך.</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="gold"
            size="lg"
            className="text-base md:text-lg px-8 py-4 md:px-12 md:py-5"
            onClick={scrollToForm}
          >
            אני רוצה להפסיק להתחיל מחדש
          </Button>
          <span className="text-muted-foreground text-xs md:text-sm">שלב ראשון לתהליך אמיתי.</span>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
