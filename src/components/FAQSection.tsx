import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const faqs = [
  {
    q: "מה זה בכלל NLP בתוך תהליך כזה?",
    a: "זה לא טיפול ולא 'קסם'.\nזו עבודה פרקטית על מה שבדרך כלל מפיל אותך באמצע:\nמצבי רוח, טריגרים, דחיינות והרגלים.",
  },
  {
    q: "אם אין לי מוטיבציה זה יעבוד?",
    a: "כן. מוטיבציה היא לא תנאי להתחלה.\nהמטרה כאן היא לבנות מערכת שמחזיקה גם בימים שאין כוח —\nואז המומנטום מגיע מהתהליך, לא מהחשק.",
  },
  {
    q: "אני כבר מבין כושר. למה שהפעם זה יהיה אחרת?",
    a: "כי ידע לבד לא מחזיק תהליך.\nכאן יש התאמה, מעקב, תיקונים בזמן אמת,\nומישהו שלא נותן לך להיעלם כשהדבר מתחיל להישבר.",
  },
  {
    q: "כמה זמן זה דורש?",
    a: "זה נבנה סביב החיים שלך.\nהמטרה היא לא להעמיס עליך,\nאלא לייצר עקביות ריאלית שאתה באמת יכול להחזיק לאורך זמן.",
  },
  {
    q: "זה אונליין או פרונטלי?",
    a: "זה ליווי היברידי.\nיש אונליין, מעקב וזמינות לאורך הדרך,\nובנוסף מתחילים עם 1:1 פרונטלי\nכדי לבנות בסיס נכון, טכניקה טובה, וכניסה חכמה לתהליך.",
  },
  {
    q: "איך אני יודע איזה מסלול מתאים לי?",
    a: "לא צריך להחליט לבד.\nמשאירים פרטים, עושים שיחה קצרה,\nורואים מה נכון לך לפי המטרה, הקצב,\nורמת הליווי שאתה באמת צריך.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionWrapper className="border-t border-border">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-14 md:mb-16 leading-tight max-w-4xl mx-auto">
        שאלות נפוצות
        <br />
        <span className="text-gold-gradient">רגע לפני שמתחילים.</span>
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <button
            key={i}
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-right bg-card border border-border rounded-xl p-6 md:p-7 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-bold text-lg md:text-xl text-foreground leading-relaxed">{faq.q}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300",
                  open === i && "rotate-180",
                )}
              />
            </div>
            <div
              className={cn("overflow-hidden transition-all duration-300", open === i ? "max-h-60 mt-4" : "max-h-0")}
            >
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">{faq.a}</p>
            </div>
          </button>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FAQSection;
