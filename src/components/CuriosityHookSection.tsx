import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_LINK = "https://wa.me/972500000000";

const CuriosityHookSection = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/section2-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Glass Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-4 w-full max-w-[750px] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl px-6 py-12 sm:px-12 sm:py-16 text-center"
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-primary text-sm font-bold tracking-wide mb-4"
        >
          רוב האנשים מפספסים את זה
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-4"
        >
          יש סיבה שאתה ממשיך להתחיל מחדש.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl mb-10"
        >
          ורוב הסיכויים שאף אחד עוד לא אמר לך אותה.
        </motion.p>

        {/* Body text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-foreground/90 text-base md:text-lg leading-relaxed mb-10 space-y-1 whitespace-pre-line"
        >
          <p>זה לא כי אתה עצלן.</p>
          <p>וזה לא כי אין לך משמעת.</p>
          <p>וזה בטוח לא כי אתה לא יודע מה צריך לעשות.</p>
          <p className="mt-4 text-foreground font-medium">אתה יודע.</p>
          <p className="text-foreground font-medium">כולם יודעים.</p>
          <p className="mt-4 text-muted-foreground">להתאמן.</p>
          <p className="text-muted-foreground">לאכול יותר טוב.</p>
          <p className="text-muted-foreground">להפסיק לדחות.</p>
          <p className="mt-4">
            אבל ידע לא משנה חיים.
            <br />
            ידע פשוט יושב בראש ומחכה ליום שיהיה לך כוח.
          </p>
          <p className="text-muted-foreground mt-2">ובינתיים — החיים קורים.</p>
        </motion.div>

        {/* Diagnosis block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="gold-border rounded-xl bg-primary/5 px-6 py-5 mb-8 text-center"
        >
          <p className="text-foreground text-base md:text-lg leading-relaxed mb-1">
            הבעיה האמיתית היא לא ידע.
          </p>
          <p className="text-foreground font-semibold text-base md:text-lg">
            הבעיה היא שאין משהו שמחזיק אותך גם ביום שאין מוטיבציה.
          </p>
        </motion.div>

        {/* Highlighted principle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-primary font-bold text-lg md:text-xl mb-10"
        >
          מוטיבציה היא רגע.
          <br />
          סטנדרט הוא מערכת.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <Button variant="gold" size="xl" onClick={scrollToForm}>
            אני רוצה להפסיק להתחיל מחדש
          </Button>
          <p className="text-muted-foreground text-sm">שלב ראשון לתהליך אמיתי.</p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground text-xs hover:text-foreground transition-colors mt-1"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            יש לך שאלה לפני? כתוב לי בוואטסאפ
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CuriosityHookSection;
