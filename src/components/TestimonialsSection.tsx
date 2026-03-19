import { useRef, useState, useEffect, useCallback } from "react";
import SectionWrapper from "./SectionWrapper";
import { cn } from "../lib/utils";
import { ChevronRight, ChevronLeft, Play, Image, Camera } from "lucide-react";

/* ── Placeholder data ── */
const imagePlaceholders = [
  { label: "לפני / אחרי", desc: "תמונות תהליך אמיתיות" },
  { label: "תהליך", desc: "שינוי שנבנה צעד אחרי צעד" },
  { label: "שינוי שנבנה לאורך זמן", desc: "תוצאות שמחזיקות" },
  { label: "תמונת תוצאה", desc: "הגוף שנבנה בדרך הנכונה" },
  { label: "התקדמות", desc: "מהיום הראשון ועד היום" },
  { label: "לפני / אחרי", desc: "הוכחה ויזואלית ברורה" },
];

const videoPlaceholders = [
  { label: "עדות וידאו", desc: "לקוח מספר על החוויה" },
  { label: "חוויה מהתהליך", desc: "איך מרגישים בפנים" },
  { label: "מה השתנה בדרך", desc: "הסיפור מאחורי השינוי" },
  { label: "איך זה מרגיש מבפנים", desc: "דברים שלא רואים בתמונה" },
  { label: "עדות וידאו", desc: "התוצאות מדברות" },
];

/* ── Carousel hook ── */
function useCarousel(itemCount: number, visibleDesktop = 3) {
  const [current, setCurrent] = useState(0);
  const max = Math.max(0, itemCount - visibleDesktop);

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, max)), [max]);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  return { current, next, prev, canPrev: current > 0, canNext: current < max };
}

/* ── Arrow button ── */
const ArrowBtn = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "next" | "prev";
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-200",
      "hover:border-primary hover:text-primary hover:shadow-[0_0_16px_hsl(45,100%,50%,0.15)]",
      "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground disabled:hover:shadow-none"
    )}
    aria-label={direction === "next" ? "הבא" : "הקודם"}
  >
    {direction === "prev" ? (
      <ChevronRight className="h-5 w-5" />
    ) : (
      <ChevronLeft className="h-5 w-5" />
    )}
  </button>
);

/* ── Image card ── */
const ImageCard = ({ label, desc }: { label: string; desc: string }) => (
  <div className="group flex-shrink-0 w-[85vw] sm:w-[48%] lg:w-[31%] px-2">
    <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/60 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_24px_hsl(45,100%,50%,0.08)]">
      {/* Image placeholder area */}
      <div className="relative flex aspect-[4/5] items-center justify-center bg-gradient-to-b from-muted/40 to-secondary/80">
        <div className="flex flex-col items-center gap-3 opacity-40">
          <Camera className="h-10 w-10 text-muted-foreground" />
          <div className="h-px w-12 bg-border" />
        </div>
        {/* Tag */}
        <div className="absolute top-4 right-4 rounded-full border border-primary/30 bg-card/80 px-4 py-1.5 text-sm font-bold text-primary backdrop-blur-sm">
          {label}
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-border bg-card/60 px-5 py-4">
        <p className="text-base font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  </div>
);

/* ── Video card ── */
const VideoCard = ({ label, desc }: { label: string; desc: string }) => (
  <div className="group flex-shrink-0 w-[85vw] sm:w-[48%] lg:w-[31%] px-2">
    <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/60 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_24px_hsl(45,100%,50%,0.08)]">
      {/* Video placeholder area */}
      <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-muted/30 via-secondary/80 to-muted/50">
        {/* Play button */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/50 bg-card/70 text-primary backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(45,100%,50%,0.2)]">
          <Play className="h-7 w-7 fill-primary mr-[-2px]" />
        </div>
        {/* Duration placeholder */}
        <div className="absolute bottom-3 left-3 rounded bg-background/70 px-2 py-0.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          0:00
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-border bg-card/60 px-5 py-4">
        <p className="text-base font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  </div>
);

/* ── Section label ── */
const CarouselLabel = ({ icon: Icon, text }: { icon: typeof Image; text: string }) => (
  <div className="mb-6 flex items-center gap-2.5">
    <Icon className="h-5 w-5 text-primary" />
    <span className="text-base font-bold text-primary tracking-wide">{text}</span>
    <div className="h-px flex-1 bg-border/60" />
  </div>
);

/* ═══════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════ */
const TestimonialsSection = () => {
  const imgCarousel = useCarousel(imagePlaceholders.length);
  const vidCarousel = useCarousel(videoPlaceholders.length);

  return (
    <SectionWrapper className="border-t border-border overflow-hidden">
      {/* ── Headline ── */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-5">
        לא צריך לדמיין איך זה נראה.{" "}
        <span className="text-gold-gradient">אפשר לראות.</span>
      </h2>

      <p className="mx-auto max-w-2xl text-center text-lg md:text-xl text-muted-foreground leading-relaxed mb-16 md:mb-20">
        תוצאות אמיתיות נראות אחרת מדיבורים.
        <br />
        הסקשן הזה בנוי להציג תמונות תהליך, לפני־ואחרי, ועדויות וידאו בצורה נקייה, ברורה ויוקרתית.
      </p>

      {/* ═══ IMAGE CAROUSEL ═══ */}
      <div className="mb-16 md:mb-20">
        <div className="flex items-center justify-between mb-6">
          <CarouselLabel icon={Camera} text="תמונות תהליך" />
          <div className="flex gap-2">
            <ArrowBtn direction="prev" onClick={imgCarousel.prev} disabled={!imgCarousel.canPrev} />
            <ArrowBtn direction="next" onClick={imgCarousel.next} disabled={!imgCarousel.canNext} />
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(${imgCarousel.current * (100 / 3)}%)`,
            }}
          >
            {imagePlaceholders.map((item, i) => (
              <ImageCard key={i} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ VIDEO CAROUSEL ═══ */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <CarouselLabel icon={Play} text="עדויות וידאו" />
          <div className="flex gap-2">
            <ArrowBtn direction="prev" onClick={vidCarousel.prev} disabled={!vidCarousel.canPrev} />
            <ArrowBtn direction="next" onClick={vidCarousel.next} disabled={!vidCarousel.canNext} />
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(${vidCarousel.current * (100 / 3)}%)`,
            }}
          >
            {videoPlaceholders.map((item, i) => (
              <VideoCard key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
