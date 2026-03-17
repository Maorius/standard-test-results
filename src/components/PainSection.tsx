import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { useScrollReveal } from "@/lib/landing-utils";
import { cn } from "@/lib/utils";

const PainSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/Section4Background.png')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/70" />

      {/* Gradient fade: image visible at top, fading to solid dark at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />

      {/* Subtle blur layer at bottom for CTA readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 py-16 md:py-24 lg:py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-10 md:mb-14 text-foreground leading-tight">
              זה כבר מזמן לא רק עניין של כושר.
            </h2>

            <div className="max-w-3xl mx-auto mb-14 md:mb-18 space-y-2 md:space-y-3">
              {[
                "כל פעם שאתה אומר לעצמך",
                "'ממחר אני חוזר לזה'",
                "ואז שוב לא עומד בזה —",
                "",
                "זה לא נשאר רק בגוף.",
                "זה מחלחל פנימה.",
                "",
                "לדרך שבה אתה מסתכל על עצמך,",
                "לדרך שבה אתה מדבר עם עצמך בשקט,",
                "ולאמון שלך בזה שהפעם אתה באמת תעמוד בזה.",
                "",
                "בשלב מסוים, זה כבר לא רק עוד ניסיון שלא עבד.",
                "זה הופך להרגל מסוכן:",
                "להבטיח לעצמך — ואז להאמין לזה קצת פחות.",
              ].map((line, i) =>
                line === "" ? (
                  <div key={i} className="h-3 md:h-4" />
                ) : (
                  <p
                    key={i}
                    className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed"
                  >
                    {line}
                  </p>
                )
              )}
            </div>

            <p className="text-primary font-black text-xl md:text-3xl lg:text-4xl leading-snug mb-10 md:mb-14 max-w-3xl mx-auto">
              ובדיוק בגלל זה הבעיה היא לא עוד מוטיבציה —
              <br />
              אלא משהו שיחזיק גם כשהיא נעלמת.
            </p>

            <div className="flex flex-col items-center gap-2">
              <Button variant="gold" size="lg" className="text-base md:text-lg px-8 py-4 md:px-12 md:py-5" onClick={scrollToForm}>
                אני רוצה להפסיק להתחיל מחדש
              </Button>
              <span className="text-muted-foreground text-xs md:text-sm">
                שלב ראשון לתהליך אמיתי.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
