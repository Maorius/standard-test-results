import SectionWrapper from "./SectionWrapper";
import { Button } from "./ui/button";
import { scrollToForm } from "../lib/landing-utils";

const steps = [
  { num: "01", text: "ממלאים בדיקת התאמה (5 דק׳)" },
  { num: "02", text: "שיחת אפיון קצרה" },
  { num: "03", text: "בניית תוכנית + תזונה + יעד שבועי" },
  { num: "04", text: "מעקב שבועי + התאמות" },
];

const ProtocolSection = () => {
  return (
    <SectionWrapper>
      <h2 className="text-2xl md:text-4xl font-black text-center mb-12">הפרוטוקול</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {steps.map((s) => (
          <div key={s.num} className="text-center">
            <span className="text-4xl font-black text-primary block mb-3">{s.num}</span>
            <p className="text-foreground font-medium">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="goldOutline" size="lg" onClick={scrollToForm}>
          אני רוצה להפסיק להתחיל מחדש
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default ProtocolSection;
