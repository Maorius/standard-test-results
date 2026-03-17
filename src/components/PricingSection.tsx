import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "CORE",
    duration: "3 חודשים",
    tagline: "כניסה נכונה לתהליך.",
    description: "לבנות בסיס.\nלהיכנס לקצב.\nלהפסיק להתחיל מחדש.",
    features: ["אונליין 3 חודשים", "חודש ראשון 1:1 פרונטלי", "תזונה + אימונים + שיחה שבועית + זמינות"],
    price: "1,970 ₪",
    recommended: false,
  },
  {
    name: "ELITE",
    duration: "6 חודשים",
    tagline: "להיכנס עמוק ולעשות שינוי שמחזיק.",
    description: "יותר זמן.\nיותר החזקה.\nיותר מקום לשינוי אמיתי.",
    features: [
      "אונליין 6 חודשים",
      "חודש ראשון + חודש שלישי 1:1 פרונטלי",
      "בחודש 3: מעבר לשלב מתקדם ותרגילים מתקדמים",
      "תזונה + אימונים + שיחה שבועית + זמינות",
    ],
    price: "3,840 ₪",
    recommended: true,
  },
];

const PricingSection = () => {
  return (
    <SectionWrapper className="border-t border-border">
      {/* Headline */}
      {/* Headline */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-6">
        שני מסלולים. אותה שיטה. <span className="text-gold-gradient">עומק אחר.</span>
      </h2>

      {/* Framing */}
      <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16 space-y-1">
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">אתה לא בוחר &lsquo;חבילה&rsquo;.</p>
        <p className="text-foreground text-lg md:text-xl font-semibold leading-relaxed">
          אתה בוחר איך להיכנס לתהליך — וכמה חזק להחזיק אותו.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative rounded-xl p-7 md:p-10 border transition-all duration-300 flex flex-col",
              plan.recommended
                ? "border-primary bg-card shadow-[0_0_40px_hsl(45,100%,50%,0.1)]"
                : "border-border bg-card",
            )}
          >
            {plan.recommended && (
              <div className="absolute -top-3.5 right-5 bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-full flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5" />
                מומלץ
              </div>
            )}

            {/* Plan title */}
            <h3 className="text-2xl md:text-3xl font-black mb-2">
              {plan.name}{" "}
              <span className="text-muted-foreground font-normal text-lg md:text-xl">({plan.duration})</span>
            </h3>

            {/* Tagline */}
            <p className="text-primary font-semibold text-base md:text-lg mb-4">{plan.tagline}</p>

            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line">
              {plan.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-border mb-6" />

            {/* Features */}
            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground text-base md:text-lg">{f}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <p className="text-4xl md:text-5xl font-black text-primary mt-auto">{plan.price}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12 md:mt-14">
        <Button variant="gold" size="xl" onClick={scrollToForm}>
          אני רוצה להפסיק להתחיל מחדש
        </Button>
      </div>

      {/* Bottom framing line */}
      <p className="text-center text-muted-foreground/80 text-base md:text-lg mt-8 max-w-lg mx-auto leading-relaxed">
        המסלול נקבע בשיחה קצרה לפי המטרה שלך
        <br />
        לא לפי מה שנראה &lsquo;יותר יקר&rsquo;.
      </p>
    </SectionWrapper>
  );
};

export default PricingSection;
