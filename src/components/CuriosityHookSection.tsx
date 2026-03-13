import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXTS = [
  { text: "זה לא כי אתה עצלן.", size: "text-2xl sm:text-3xl md:text-4xl" },
  { text: "וזה לא כי אין לך משמעת.", size: "text-2xl sm:text-3xl md:text-4xl" },
  { text: "אתה פשוט לא מצליח להתמיד.", size: "text-2xl sm:text-3xl md:text-4xl" },
  { text: "כי לבד — זה נשבר.", size: "text-2xl sm:text-3xl md:text-4xl" },
  { text: "וכאן רוב האנשים נופלים.", size: "text-2xl sm:text-3xl md:text-4xl" },
  {
    text: "מוטיבציה היא רגע.\nסטנדרט הוא מערכת.",
    size: "text-3xl sm:text-4xl md:text-5xl",
    highlight: true,
  },
];

const INTERVAL = 4000;

const CuriosityHookSection = () => {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const advance = useCallback(() => {
    setIndex((prev) => {
      if (prev >= TEXTS.length - 1) {
        setDone(true);
        return prev;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (done) return;
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [done, advance]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-3xl">
        <div className="min-h-[120px] sm:min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`font-black leading-snug whitespace-pre-line ${TEXTS[index].size} ${
                TEXTS[index].highlight ? "text-primary" : "text-foreground"
              }`}
            >
              {TEXTS[index].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA — appears after last text */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 flex flex-col items-center gap-3"
            >
              <Button variant="gold" size="xl" onClick={scrollToForm}>
                אני רוצה להפסיק להתחיל מחדש
              </Button>
              <p className="text-muted-foreground text-sm">
                שלב ראשון לתהליך אמיתי.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CuriosityHookSection;
