import { autoFit } from "../lib/style";
import { useSettings } from "../context/SettingsContext";
import type { NextPageWithTitle } from "../lib/types";
import Reveal from "../components/Reveal";

const Contact: NextPageWithTitle = () => {
  const { phoneDisplay, phoneTel, email, addressLine, addressDetail, hours, whatsappLink } = useSettings();

  return (
    <div data-screen-label="Contact" style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 className="animate-fade-up" style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>Find us</h1>
      <Reveal>
      <div style={{ display: "grid", gridTemplateColumns: autoFit(340), gap: 34, marginTop: 32, alignItems: "start" }}>
        <div style={{ padding: 26, border: "1px solid var(--border-subtle)", borderRadius: 24, background: "var(--surface-card)", display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", gap: 14 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{addressLine}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>{addressDetail} · Nairobi CBD</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>{phoneDisplay}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>Call or WhatsApp. Photos of the damage help.</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m2 7 10 6 10-6"></path>
            </svg>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{email}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>For quotes on bulk or corporate repairs.</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{hours}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>Sunday closed. Walk in any time we are open.</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 6 }}>
            <a href={`tel:${phoneTel}`} className="btn-solid sm">Call now</a>
            <a href={whatsappLink("Hi BEAPS, I'd like to ask about a repair.")} target="_blank" rel="noreferrer" className="btn-outline sm">WhatsApp</a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ height: 300, border: "1px solid var(--border-default)", borderRadius: 24, overflow: "hidden", background: "var(--surface-card)" }}>
            <iframe
              title={`BEAPS Mobile Fix on Google Maps, ${addressLine}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(addressLine + " Nairobi")}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", filter: "var(--map-filter, none)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div style={{ padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 18, background: "var(--surface-card)" }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>Getting to {addressDetail}</h3>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Enter from the street, take the lift up and follow signage to {addressDetail}. If you cannot make it in, ask about pickup and delivery, any location.
            </p>
          </div>
        </div>
      </div>
      </Reveal>
    </div>
  );
};

Contact.pageTitle = "Contact - BEAPS Mobile Fix";

export default Contact;
