import { ReactNode } from "react";
import { useScrollReveal } from "../lib/landing-utils";
import { cn } from "../lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper = ({ children, className, id }: SectionWrapperProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "section-padding transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      <div className="container mx-auto max-w-5xl">{children}</div>
    </section>
  );
};

export default SectionWrapper;
