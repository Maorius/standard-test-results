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
  const portraitRef = useRef<HTMLDivElement>(null);
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
      <div className="container mx-auto max-w-5xl">
        {/* ===== PORTRAIT CIRCLE ===== */}
        <div
          ref={portraitRef}
          className={cn(
            "flex flex-col items-center mb-14 md:mb-20 transition-all duration-1000",
            sectionVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          )}
        >
          {/* Circle frame with portrait breaking out */}
          <div className="relative w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 mb-10 md:mb-12">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-xl scale-110" />
            {/* Border ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 shadow-[0_0_40px_hsl(45,100%,50%,0.12)]" />
            {/* Inner subtle shadow overlay */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_-20px_40px_rgba(0,0,0,0.4)]" />
            {/* Portrait image – overflows circle upward */}
            <div className="absolute inset-0 rounded-full overflow-visible flex items-end justify-center">
              <img
                src="public/images/matan-bio.png"
                alt="מתן ברוך"
                className={cn(
                  "w-[115%] max-w-none object-cover object-top -translate-y-[12%] transition-all duration-1000 delay-200",
                  sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-y-4",
                )}
                style={{ clipPath: "ellipse(50% 65% at 50% 55%)" }}
              />
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
                style={{ transitionDelay: `${600 + i * 150}ms` }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground text-base md:text-lg font-medium">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BIO TITLE ===== */}
        <div
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-700 delay-500",
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
            אני לא מלמד משהו <span className="text-gold-gradient">שלא חייתי בעצמי.</span>
          </h2>
        </div>

        {/* ===== BIO BODY ===== */}
        <div className="max-w-3xl mx-auto">
          {/* Paragraph 1 – intro */}
          <div className="mb-8 md:mb-10 text-center md:text-right">
            <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed font-bold mb-1">אני מתן.</p>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">
              <span className="text-foreground font-semibold">כל הילדות הייתי הילד השמן</span> — זה שנשאר הרבה פעמים
              לבד, ולפעמים אפילו מוחרם.
            </p>
          </div>

          {/* Paragraph 2 + childhood image */}
          <div className="relative mb-10 md:mb-14">
            {/* Childhood image – floats right on desktop */}
            <div
              ref={childhoodRef}
              className={cn(
                "md:float-right md:mr-0 md:ml-8 mb-6 md:mb-4 flex flex-col items-center transition-all duration-900",
                childhoodVisible ? "opacity-100 md:translate-x-0" : "opacity-0 md:translate-x-8",
              )}
            >
              <div className="relative w-44 h-56 md:w-48 md:h-60 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-border/50">
                <img src="public/images/matan-childhood.jpg" alt="מתן בילדותו" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <p className="text-muted-foreground text-sm mt-3 italic">"פעם זה היה אני."</p>
            </div>

            <div className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed space-y-5">
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

            <div className="clear-both" />
          </div>

          {/* Paragraph 3 – the shift + glowup image */}
          <div className="relative mb-10 md:mb-14">
            {/* Glowup image – floats left on desktop */}
            <div
              ref={glowupRef}
              className={cn(
                "md:float-left md:ml-0 md:mr-8 mb-6 md:mb-4 flex flex-col items-center transition-all duration-900",
                glowupVisible ? "opacity-100 md:translate-x-0" : "opacity-0 md:-translate-x-8",
              )}
            >
              <div className="relative w-44 h-56 md:w-48 md:h-60 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-border/50">
                <img src="public/images/matan-glowup.jpg" alt="מתן היום" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <p className="text-muted-foreground text-sm mt-3 italic">"השינוי לא קרה ביום — הוא נבנה בתהליך."</p>
            </div>

            <div className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed space-y-5">
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

            <div className="clear-both" />
          </div>

          {/* ===== CLOSING LINE ===== */}
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
