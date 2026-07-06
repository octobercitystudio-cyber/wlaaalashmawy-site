import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="animate-fade-in" style={{ flex: 1, padding: "var(--spacing-xl) 0" }}>
      <div className="container">
        <div className="text-center mb-xl">
          <h1 className="text-gold" style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>تواصل معنا</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)", opacity: 0.9 }}>
            نسعد دائماً بالإجابة على استفساراتكم وتقديم الدعم اللازم. لا تتردد في التواصل معنا لحجز استشارة مجانية أو لطلب خدماتنا المالية والمحاسبية.
          </p>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-3 gap-lg mb-xl">
          <div className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📍</div>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>العنوان</h3>
            <p>الرياض، المملكة العربية السعودية<br/>طريق الملك فهد، برج الأعمال</p>
          </div>
          <div className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📞</div>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>الهاتف</h3>
            <p dir="ltr" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>+966 50 000 0000</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>نستقبل اتصالاتكم خلال أوقات العمل</p>
          </div>
          <div className="premium-card text-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>البريد الإلكتروني</h3>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>info@alashmawy-cpa.com</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>للرد على استفساراتكم على مدار الساعة</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md-grid-cols-2 gap-lg items-stretch">
          {/* Contact Form */}
          <form className="premium-card" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)", textAlign: "right", background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "1rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.5rem" }}>أرسل لنا رسالة</h3>
            <div className="grid grid-cols-1 md-grid-cols-2 gap-md">
              <div>
                <label style={{ display: "block", marginBottom: "var(--spacing-sm)", color: "var(--color-text-main)", fontWeight: "bold" }}>الاسم الكامل</label>
                <input type="text" style={{ width: "100%", padding: "1rem", borderRadius: "var(--border-radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-bg-body)", color: "var(--color-text-main)", outline: "none", transition: "border 0.3s" }} placeholder="أدخل اسمك الكريم" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "var(--spacing-sm)", color: "var(--color-text-main)", fontWeight: "bold" }}>البريد الإلكتروني</label>
                <input type="email" style={{ width: "100%", padding: "1rem", borderRadius: "var(--border-radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-bg-body)", color: "var(--color-text-main)", outline: "none", transition: "border 0.3s" }} placeholder="example@domain.com" />
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "var(--spacing-sm)", color: "var(--color-text-main)", fontWeight: "bold" }}>نوع الاستشارة</label>
              <select style={{ width: "100%", padding: "1rem", borderRadius: "var(--border-radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-bg-body)", color: "var(--color-text-main)", outline: "none", transition: "border 0.3s", appearance: "none" }}>
                <option>استشارة ضريبية</option>
                <option>خدمات مراجعة وتدقيق</option>
                <option>مسك الدفاتر المحاسبية</option>
                <option>استفسار عام</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "var(--spacing-sm)", color: "var(--color-text-main)", fontWeight: "bold" }}>كيف يمكننا مساعدتك؟</label>
              <textarea rows={5} style={{ width: "100%", padding: "1rem", borderRadius: "var(--border-radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-bg-body)", color: "var(--color-text-main)", outline: "none", resize: "vertical", transition: "border 0.3s" }} placeholder="اكتب رسالتك أو استفسارك هنا بالتفصيل..." />
            </div>
            <button type="button" className="btn btn-primary" style={{ marginTop: "var(--spacing-sm)", width: "100%", padding: "1rem", fontSize: "1.1rem" }}>إرسال الطلب الآن</button>
          </form>

          {/* Map */}
          <div className="premium-card" style={{ padding: "1rem", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column" }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115860.27986064504!2d46.74542385!3d24.8190748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1718000000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: "var(--border-radius-sm)", minHeight: "400px", flex: 1 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
