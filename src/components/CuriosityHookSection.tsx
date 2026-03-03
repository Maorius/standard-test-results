import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";

const CuriosityHookSection = () => {
  return (
    <SectionWrapper className="border-b border-border">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black mb-6">אתה לא תקוע כי אין לך ידע.</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
          אתה תקוע כי אין לך מערכת שמחזיקה אותך כשאין חשק.
        </p>
        <p className="text-primary font-bold text-lg mb-8">אתה לא צריך מוטיבציה. אתה צריך סטנדרט.</p>
        <Button variant="goldOutline" size="lg" onClick={scrollToForm}>
          אני רוצה להפסיק להתחיל מחדש
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default CuriosityHookSection;
