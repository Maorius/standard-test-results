import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { MessageCircle, Check } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/972500000000";

const bullets = [
  "תוכנית אימונים ותזונה מותאמת אישית",
  "שיחה שבועית + זמינות בטלפון",
  "התחלה עם 1:1 פרונטלי כדי להיכנס לקצב",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/matan-hero.jpg"
          alt="מתן ברוך - מאמן כושר"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/95 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 px-5 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
            אתה נראה פחות טוב
            <br />
            <span className="text-gold-gradient">ממה שאתה מרגיש שמגיע לך.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
            ליווי כושר ותזונה בשילוב אימון מנטלי (NLP), כדי להפוך
            <span className="text-foreground font-medium"> "אני יודע" </span>ל
            <span className="text-foreground font-medium">"אני עושה"</span>.
          </p>

          <ul className="space-y-3 mb-10">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span className="text-foreground">{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Button variant="gold" size="xl" onClick={scrollToForm}>
              אני רוצה להפסיק להתחיל מחדש
            </Button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="gap-2 text-muted-foreground">
                <MessageCircle className="h-5 w-5" />
                מעדיף וואטסאפ? דבר איתי עכשיו
              </Button>
            </a>
          </div>

          <p className="text-muted-foreground text-sm mt-4">5 דקות. בלי חפירות. אם זה לא מתאים, אני אגיד.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
