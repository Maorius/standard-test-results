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
      <div className="relative z-10 section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-black mb-10 text-foreground">
              זה כבר מזמן לא רק עניין של כושר.
            </h2>

            <div className="max-w-2xl mx-auto mb-16 space-y-1.5">
              {[
                "כל פעם שאתה אומר לעצמך",
                "'ממחר אני חוזר לזה'",
                "ואז שוב לא עומד בזה —",
                "",
                "זה לא נשאר רק בגוף.",
                "זה מחלחל פנימה.",
                "",
                "לדרך שבה אתה מסתכל על עצמך.",
                "לדרך שבה אתה מדבר עם עצמך בשקט.",
                "ולאמון שלך בזה שהפעם אתה באמת תעמוד בזה.",
                "",
                "בשלב מסוים, זה כבר לא רק עוד ניסיון שלא עבד.",
                "זה הופך להרגל מסוכן:",
                "להבטיח לעצמך — ואז להאמין לזה קצת פחות.",
              ].map((line, i) =>
                line === "" ? (
                  <div key={i} className="h-3" />
                ) : (
                  <p
                    key={i}
                    className="text-muted-foreground text-base md:text-lg leading-relaxed"
                  >
                    {line}
                  </p>
                )
              )}
            </div>

            <p className="text-primary font-black text-lg md:text-2xl leading-snug mb-14 max-w-2xl mx-auto">
              ובדיוק בגלל זה הבעיה היא לא עוד מוטיבציה —
              <br />
              אלא משהו שיחזיק גם כשהיא נעלמת.
            </p>

            <div className="flex flex-col items-center gap-2">
              <Button variant="gold" size="xl" onClick={scrollToForm}>
                אני רוצה להפסיק להתחיל מחדש
              </Button>
              <span className="text-muted-foreground text-xs">
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
