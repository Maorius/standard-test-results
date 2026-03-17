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
      <div className="relative z-10 py-24 md:py-36 lg:py-44 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-14 md:mb-20 text-foreground leading-tight">
              זה כבר מזמן לא רק עניין של כושר.
            </h2>

            <div className="max-w-3xl mx-auto mb-20 md:mb-24 space-y-3 md:space-y-4">
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
                  <div key={i} className="h-4 md:h-6" />
                ) : (
                  <p
                    key={i}
                    className="text-muted-foreground text-xl md:text-2xl lg:text-3xl leading-relaxed"
                  >
                    {line}
                  </p>
                )
              )}
            </div>

            <p className="text-primary font-black text-2xl md:text-4xl lg:text-5xl leading-snug mb-16 md:mb-20 max-w-3xl mx-auto">
              ובדיוק בגלל זה הבעיה היא לא עוד מוטיבציה —
              <br />
              אלא משהו שיחזיק גם כשהיא נעלמת.
            </p>

            <div className="flex flex-col items-center gap-3">
              <Button variant="gold" size="xl" className="text-lg md:text-xl px-10 py-5 md:px-14 md:py-6" onClick={scrollToForm}>
                אני רוצה להפסיק להתחיל מחדש
              </Button>
              <span className="text-muted-foreground text-sm md:text-base">
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
