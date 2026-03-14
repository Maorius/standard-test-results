import StickyCtaBar from "@/components/StickyCtaBar";
import HeroSection from "@/components/HeroSection";
import CuriosityHookSection from "@/components/CuriosityHookSection";
import StandardTestSection from "@/components/StandardTestSection";
import PainSection from "@/components/PainSection";
import ThreeEnginesSection from "@/components/ThreeEnginesSection";
import DeliverablesSection from "@/components/DeliverablesSection";
import ProtocolSection from "@/components/ProtocolSection";
import PricingSection from "@/components/PricingSection";
import FitSection from "@/components/FitSection";
import FAQSection from "@/components/FAQSection";
import FinalCtaFormSection from "@/components/FinalCtaFormSection";
import { QuizProvider } from "@/context/QuizContext";

const Index = () => {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-background text-foreground" dir="rtl">
        <StickyCtaBar />
        <HeroSection />
        <CuriosityHookSection />
        <StandardTestSection />
        <PainSection />
        <ThreeEnginesSection />
        <DeliverablesSection />
        <ProtocolSection />
        <PricingSection />
        <FitSection />
        <FAQSection />
        <FinalCtaFormSection />

        {/* Footer */}
        <footer className="border-t border-border py-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} מתן ברוך. כל הזכויות שמורות.
          </p>
        </footer>
      </div>
    </QuizProvider>
  );
};

export default Index;
