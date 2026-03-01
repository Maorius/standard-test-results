import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "מה זה NLP בליווי?",
    a: "כלים פרקטיים להתמדה: מצבי רוח, טריגרים והרגלים. לא טיפול ולא קסמים.",
  },
  {
    q: "אם אין לי מוטיבציה זה יעבוד?",
    a: "מוטיבציה לא תנאי. בונים מערכת ואז התוצאות יוצרות מומנטום.",
  },
  {
    q: "אני כבר מבין כושר, למה זה יהיה אחרת?",
    a: "כי כאן יש מעקב ותיקונים בזמן אמת. לא נשארים לבד.",
  },
  {
    q: "כמה זמן זה דורש?",
    a: "מותאם ללוז. המטרה עקביות ריאלית, לא קיצון.",
  },
  {
    q: "אונליין או פרונטלי?",
    a: "היברידי. מתחילים עם 1:1 פרונטלי לבסיס וטכניקה.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionWrapper className="border-t border-border">
      <h2 className="text-2xl md:text-4xl font-black text-center mb-12">שאלות נפוצות</h2>

      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <button
            key={i}
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-right bg-card border border-border rounded-lg p-5 transition-colors hover:border-muted-foreground/30"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-bold text-foreground">{faq.q}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200",
                  open === i && "rotate-180"
                )}
              />
            </div>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                open === i ? "max-h-40 mt-3" : "max-h-0"
              )}
            >
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          </button>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FAQSection;
