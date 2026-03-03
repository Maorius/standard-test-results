import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";

const bullets = ["חזק בעצות לאחרים. חלש מול עצמך.", "מבין כושר, אבל הגוף לא נראה ככה.", "מחכה למוטיבציה ומתבאס שאין."];

const PainSection = () => {
  return (
    <SectionWrapper className="border-t border-border">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black mb-6">הכאב האמיתי</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          אתה חזק בעצות לאחרים. מול עצמך אתה מתחיל, נעלם, וחוזר אחרי שבועיים. ואז אתה עוד פעם מבטיח לעצמך ועוד פעם לא
          עומד. זה שוחק.
        </p>

        <ul className="space-y-3 mb-8">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-foreground font-medium">{b}</span>
            </li>
          ))}
        </ul>

        <p className="text-primary font-bold text-lg mb-8">אף אחד לא יכבד אותך יותר ממה שאתה מכבד את ההבטחות שלך.</p>

        <Button variant="goldOutline" size="lg" onClick={scrollToForm}>
          אני רוצה להפסיק להתחיל מחדש
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default PainSection;
