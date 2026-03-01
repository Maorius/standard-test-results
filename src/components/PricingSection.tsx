import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "CORE",
    duration: "3 חודשים",
    tagline: "להיכנס לקצב ולהפסיק להיעלם.",
    features: [
      "אונליין 3 חודשים",
      "חודש ראשון 1:1 פרונטלי",
      "תזונה + אימונים + שיחה שבועית + זמינות",
    ],
    price: "1,970 ₪",
    cta: "בדיקת התאמה למסלול CORE",
    recommended: false,
  },
  {
    name: "ELITE",
    duration: "6 חודשים",
    tagline: "שינוי יציב שמחזיק.",
    features: [
      "אונליין 6 חודשים",
      "חודש ראשון + חודש שלישי 1:1 פרונטלי",
      "בחודש 3: מעבר לשלב מתקדם ותרגילים מתקדמים",
      "תזונה + אימונים + שיחה שבועית + זמינות",
    ],
    price: "3,840 ₪",
    cta: "בדיקת התאמה למסלול ELITE",
    recommended: true,
  },
];

const PricingSection = () => {
  return (
    <SectionWrapper className="border-t border-border">
      <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
        המסלול שמתאים למטרה שלך
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative rounded-xl p-6 md:p-8 border transition-colors",
              plan.recommended
                ? "border-primary bg-card shadow-[0_0_40px_hsl(45,100%,50%,0.08)]"
                : "border-border bg-card"
            )}
          >
            {plan.recommended && (
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="h-3 w-3" />
                מומלץ
              </div>
            )}

            <h3 className="text-xl font-black mb-1">
              {plan.name}{" "}
              <span className="text-muted-foreground font-normal text-base">({plan.duration})</span>
            </h3>
            <p className="text-muted-foreground mb-6">{plan.tagline}</p>

            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span className="text-foreground text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <p className="text-3xl font-black text-primary mb-6">{plan.price}</p>

          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button variant="gold" size="xl" onClick={scrollToForm}>
          בדיקת התאמה בחינם
        </Button>
        <p className="text-muted-foreground text-sm mt-3">
          המסלול נקבע בשיחה קצרה לפי מטרה, ניסיון ולו״ז.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default PricingSection;
