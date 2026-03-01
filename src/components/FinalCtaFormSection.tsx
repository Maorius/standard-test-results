import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";

const goalOptions = [
  { value: "weight-loss", label: "ירידה במשקל" },
  { value: "toning", label: "חיטוב" },
  { value: "muscle-gain", label: "עלייה במסת שריר" },
  { value: "general-fitness", label: "כושר כללי" },
];

const experienceOptions = [
  { value: "beginner", label: "מתחיל" },
  { value: "returning", label: "חוזר" },
  { value: "regular", label: "מתאמן קבוע" },
];

const formatOptions = [
  { value: "online", label: "אונליין" },
  { value: "frontal", label: "פרונטלי" },
  { value: "hybrid", label: "היברידי" },
];

const selectClass =
  "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none";
const inputClass =
  "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const FinalCtaFormSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SectionWrapper id="lead-form-section">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-black mb-4">
          מספיק לחיות על <span className="text-gold-gradient">"מחר"</span>.
        </h2>
        <p className="text-muted-foreground text-lg">
          מלא בדיקת התאמה. אם זה מתאים, אני חוזר אליך לתיאום שיחה קצרה ומתחילים.
        </p>
      </div>

      {submitted ? (
        <div className="max-w-lg mx-auto text-center bg-card border border-primary/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-3">הטופס נשלח בהצלחה!</h3>
          <p className="text-muted-foreground">אחזור אליך בהקדם לתיאום שיחה קצרה.</p>
        </div>
      ) : (
        <form
          id="lead-form"
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-card border border-border rounded-xl p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">שם מלא</label>
            <input type="text" required placeholder="השם שלך" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">טלפון</label>
            <input type="tel" required placeholder="050-0000000" className={inputClass} dir="ltr" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">גיל</label>
            <input type="number" required placeholder="25" min={16} max={99} className={inputClass} dir="ltr" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">היעד שלי</label>
            <select required className={selectClass} defaultValue="">
              <option value="" disabled>בחר...</option>
              {goalOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">ניסיון קודם</label>
            <select required className={selectClass} defaultValue="">
              <option value="" disabled>בחר...</option>
              {experienceOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">איך הכי נוח לך?</label>
            <select required className={selectClass} defaultValue="">
              <option value="" disabled>בחר...</option>
              {formatOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">לאיזה מסלול אתה נוטה?</label>
            <select required className={selectClass} defaultValue="">
              <option value="" disabled>בחר...</option>
              <option value="core">CORE (3 חודשים)</option>
              <option value="elite">ELITE (6 חודשים)</option>
              <option value="unsure">לא יודע, תכוון אותי</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">מה הכי תוקע אותך היום?</label>
            <textarea rows={2} placeholder="כתוב בקצרה..." className={inputClass} />
          </div>

          <Button variant="gold" size="xl" type="submit" className="w-full">
            שלח בדיקה ותאם שיחה
          </Button>

          <p className="text-center text-muted-foreground text-xs">
            לא שולחים ספאם. רק תיאום שיחה.
          </p>
        </form>
      )}

      {/* Bio section at footer */}
      <div className="mt-16 flex flex-col md:flex-row items-center gap-8 max-w-2xl mx-auto">
        <img
          src="/images/matan-bio.jpg"
          alt="מתן ברוך"
          className="w-32 h-32 rounded-full object-cover border-2 border-primary/30"
        />
        <div>
          <h3 className="text-xl font-bold mb-2">מתן ברוך</h3>
          <p className="text-muted-foreground leading-relaxed">
            מאמן כושר ותזונה בשילוב NLP. עוזר לאנשים שיודעים מה צריך לעשות — אבל לא עושים.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FinalCtaFormSection;
