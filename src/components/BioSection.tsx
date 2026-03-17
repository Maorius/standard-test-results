import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const trustBullets = [
  "עבר בעצמו שינוי אמיתי — לא רק למד עליו",
  "בנה דרך שמחזיקה בלי קיצון ובלי לוותר על החיים",
  "היום מלווה גברים לבנות גוף, ביטחון ונוכחות",
];

const BioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const childhoodRef = useRef<HTMLDivElement>(null);
  const glowupRef = useRef<HTMLDivElement>(null);

  const [sectionVisible, setSectionVisible] = useState(false);
  const [childhoodVisible, setChildhoodVisible] = useState(false);
  const [glowupVisible, setGlowupVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObserver = (ref: React.RefObject<HTMLElement>, setter: (v: boolean) => void, threshold = 0.2) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
            obs.disconnect();
          }
        },
        { threshold },
      );
      if (ref.current) obs.observe(ref.current);
      observers.push(obs);
    };

    createObserver(sectionRef, setSectionVisible, 0.1);
    createObserver(childhoodRef, setChildhoodVisible, 0.3);
    createObserver(glowupRef, setGlowupVisible, 0.3);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28 lg:px-16 lg:py-36">
      <div className="container mx-auto max-w-6xl">
        {/* ===== 1. BIO TITLE – FIRST IN HIERARCHY ===== */}
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

        {/* ===== 2. PORTRAIT CIRCLE ===== */}
        <div
          className={cn(
            "flex flex-col items-center mb-14 md:mb-20 transition-all duration-1000 delay-200",
            sectionVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          )}
        >
          {/*
           * PORTRAIT LAYOUT — "emerging from the ring"
           *
           * The outer wrapper is intentionally TALLER than the circle so the
           * portrait can rise above the ring boundary.  The circle dimensions
           * are replicated only in the elements that need the circular shape
           * (glow + frame), both anchored to the BOTTOM of the wrapper.
           *
           * Layer order (back → front):
           *   z-0  – glow bloom (aligned to circle area at bottom)
           *   z-10 – portrait image (anchored bottom-center, ascends freely)
           *   z-20 – circle border ring + inner shadow (sits on top of image
           *          exactly where they intersect, reinforcing the frame-front look)
           *)
           */}
          <div className="relative w-72 md:w-[22rem] lg:w-[26rem] h-[360px] md:h-[420px] lg:h-[500px] mb-10 md:mb-12">
            {/* Glow bloom – lives behind everything, sized to the circle area */}
            <div className="absolute bottom-0 inset-x-0 h-72 md:h-[22rem] lg:h-[26rem] rounded-full bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl scale-125 z-0 pointer-events-none" />

            {/* Portrait – z-10, anchored to the bottom, free to emerge upward */}
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

            {/* Circle frame – z-20, on top of the portrait at the ring boundary.
                Sized identically to the glow, anchored to the bottom so the ring
                sits right where the portrait "exits" the circle. */}
            <div className="absolute bottom-0 inset-x-0 h-72 md:h-[22rem] lg:h-[26rem] z-20 pointer-events-none">
              {/* Outer glow ring border */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 shadow-[0_0_60px_hsl(45,100%,50%,0.10)]" />
              {/* Inner shadow – anchors the portrait at the base of the circle */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_-40px_60px_rgba(0,0,0,0.55)]" />
            </div>
          </div>

          {/* ===== 3. TRUST BULLETS ===== */}
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

        {/* ===== 4. BIO BODY ===== */}
        <div className="max-w-4xl mx-auto">
          {/* Paragraph 1 – intro */}
          <div className="mb-8 md:mb-10 text-center md:text-right">
            <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed font-bold mb-1">אני מתן.</p>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">
              <span className="text-foreground font-semibold">כל הילדות הייתי הילד השמן</span> — זה שנשאר הרבה פעמים
              לבד, ולפעמים אפילו מוחרם.
            </p>
          </div>

          {/* ===== Paragraph 2 + Childhood image =====
           *
           * Layout strategy (replaces CSS float):
           *   mobile  → flex-col: image first, text below
           *   desktop → CSS grid [1fr auto]: text in left column, image in right column
           *
           * Image uses w-full h-auto so it renders at its full natural proportions
           * with no cropping — the rounded container clips only the corners.
           *)
           */}
          <div className="mb-10 md:mb-14">
            <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] md:gap-10 md:items-start">
              {/* Image – DOM-first so mobile shows it above the text */}
              <div
                ref={childhoodRef}
                className={cn(
                  "order-1 md:order-2 flex flex-col items-center mb-6 md:mb-0 transition-all duration-700",
                  childhoodVisible ? "opacity-100 translate-x-0" : "opacity-0 md:translate-x-8",
                )}
              >
                <div className="relative w-56 md:w-64 lg:w-72 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-border/50">
                  <img src="/images/matan-childhood.jpg" alt="מתן בילדותו" className="w-full h-auto block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                </div>
                <p className="text-muted-foreground text-sm mt-3 italic">"פעם זה היה אני."</p>
              </div>

              {/* Text */}
              <div className="order-2 md:order-1 text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed space-y-5">
                <p>
                  מבחוץ זה היה משקל.
                  <br />
                  מבפנים זה היה הרבה יותר מזה: בושה, חוסר ביטחון, ותחושה שאתה תקוע בתוך גרסה של עצמך שלא באמת משקפת מי
                  שאתה יכול להיות.
                </p>
                <p>
                  באותם ימים, להשתנות הרגיש כמעט בלתי אפשרי.
                  <br />
                  אפילו לרוץ או לעלות במדרגות היה כבד.
                  <br />
                  והרעיון של ״להיכנס לכושר״ הרגיש כמו לוותר על כל מה שאני אוהב.
                </p>
              </div>
            </div>
          </div>

          {/* ===== Paragraph 3 – Shift + Glowup image =====
           *
           * Layout strategy:
           *   mobile  → flex-col: image first, text below
           *   desktop → CSS grid [auto 1fr]: image in left column, text in right column
           *)
           */}
          <div className="mb-10 md:mb-14">
            <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] md:gap-10 md:items-start">
              {/* Image – DOM-first for mobile */}
              <div
                ref={glowupRef}
                className={cn(
                  "order-1 flex flex-col items-center mb-6 md:mb-0 transition-all duration-700",
                  glowupVisible ? "opacity-100 translate-x-0" : "opacity-0 md:-translate-x-8",
                )}
              >
                <div className="relative w-56 md:w-64 lg:w-72 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-border/50">
                  <img src="/images/matan-glowup.jpg" alt="מתן היום" className="w-full h-auto block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                </div>
                <p className="text-muted-foreground text-sm mt-3 italic">"השינוי לא קרה ביום — הוא נבנה בתהליך."</p>
              </div>

              {/* Text */}
              <div className="order-2 text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed space-y-5">
                <p>
                  השינוי האמיתי התחיל כשהבנתי ש
                  <span className="text-foreground font-semibold">לא צריך לחיות על קיצון כדי להשתנות.</span>
                </p>
                <p>
                  לא צריך לסבול כדי להתקדם.
                  <br />
                  צריך דרך שאפשר להחזיק — בגוף, בהרגלים, ובראש.
                </p>
                <p>
                  היום אני כבר לא אותו ילד.
                  <br />
                  אני חזק יותר, בטוח יותר, ואוהב את איך שאני נראה — בלי לוותר על החיים עצמם.
                </p>
                <p>
                  והיום אני עוזר לגברים לעשות את אותו מעבר:
                  <br />
                  להרגיש טוב יותר בגוף שלהם, להפסיק לחיות במבוכה, ולבנות נוכחות שהם מרגישים ראויים לה.
                </p>
              </div>
            </div>
          </div>

          {/* ===== 5. CLOSING LINE ===== */}
          <div className="text-center mt-14 md:mt-20 mb-10 md:mb-14">
            <p className="text-foreground text-lg md:text-2xl lg:text-3xl font-bold leading-snug max-w-2xl mx-auto">
              כי בסוף זה לא רק לרדת במשקל או להתחטב —
              <br />
              <span className="text-primary">זה להפסיק לחיות קטן בתוך הגוף של עצמך.</span>
            </p>
          </div>

          {/* ===== CTA ===== */}
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
      </div>
    </section>
  );
};

export default BioSection;
