import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/landing-utils";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_LINK = "https://wa.me/972500000000";

const StickyCtaBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-5xl flex items-center justify-between py-3 px-5">
        <span className="text-foreground font-bold text-lg">מתן ברוך</span>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-xs hidden sm:inline">5 דק׳</span>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="gap-1.5 text-foreground">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">וואטסאפ</span>
            </Button>
          </a>
          <Button variant="gold" size="sm" onClick={scrollToForm}>
            בדיקת התאמה בחינם
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCtaBar;
