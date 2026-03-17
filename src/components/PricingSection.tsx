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
    features: [
      "אונליין 3 חודשים",
      "חודש ראשון 1:1 פרונטלי",
      "תזונה + אימונים + שיחה שבועית + זמינות",
    ],
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
      <h2 className="text-3xl md:text-5xl font-black text-center mb-4">
        שני מסלולים. אותה שיטה. עומק אחר.
      </h2>

      {/* Framing line */}
      <p className="text-center text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
        אתה לא בוחר &lsquo;חבילה&rsquo;.
        <br />
        אתה בוחר איך להיכנס לתהליך — וכמה חזק להחזיק אותו.
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative rounded-xl p-6 md:p-8 border transition-all duration-300",
              plan.recommended
                ? "border-primary bg-card shadow-[0_0_40px_hsl(45,100%,50%,0.1)]"
                : "border-border bg-card"
            )}
          >
            {plan.recommended && (
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="h-3 w-3" />
                מומלץ
              </div>
            )}

            {/* Plan title */}
            <h3 className="text-xl font-black mb-1">
              {plan.name}{" "}
              <span className="text-muted-foreground font-normal text-base">
                ({plan.duration})
              </span>
            </h3>

            {/* Tagline */}
            <p className="text-primary font-semibold text-sm mb-3">
              {plan.tagline}
            </p>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 whitespace-pre-line">
              {plan.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-border mb-5" />

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span className="text-foreground text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <p className="text-3xl font-black text-primary">{plan.price}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Button variant="gold" size="xl" onClick={scrollToForm}>
          אני רוצה להפסיק להתחיל מחדש
        </Button>
      </div>

      {/* Bottom framing line */}
      <p className="text-center text-muted-foreground text-sm mt-6 max-w-md mx-auto leading-relaxed">
        המסלול נקבע בשיחה קצרה לפי המטרה שלך —
        <br />
        לא לפי מה שנראה &lsquo;יותר יקר&rsquo;.
      </p>
    </SectionWrapper>
  );
};

export default PricingSection;
