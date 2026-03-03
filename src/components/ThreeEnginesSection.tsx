import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { Dumbbell, Apple, Brain } from "lucide-react";

const engines = [
  {
    icon: Dumbbell,
    title: "אימונים מותאמים",
    desc: "תוכנית שנבנית לפי היעד ומתעדכנת לפי התקדמות.",
  },
  {
    icon: Apple,
    title: "תזונה שאתה יכול לחיות איתה",
    desc: "מותאמת להעדפות, ללוז ולמציאות. בלי הכול-או-כלום.",
  },
  {
    icon: Brain,
    title: "NLP לביצוע",
    desc: 'כלים פרקטיים להתמדה, משמעת וניהול רגעי "אין לי כוח".',
  },
];

const ThreeEnginesSection = () => {
  return (
    <SectionWrapper>
      <h2 className="text-2xl md:text-4xl font-black text-center mb-12">
        כושר + תזונה + אימון מנטלי = <span className="text-gold-gradient">תוצאה שלא נעלמת</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {engines.map((e) => (
          <div
            key={e.title}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors duration-300"
          >
            <e.icon className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">{e.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{e.desc}</p>
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

export default ThreeEnginesSection;
