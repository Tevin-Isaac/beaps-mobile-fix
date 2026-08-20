import { useRouter } from "next/router";
import { PHONE_DISPLAY, PHONE_TEL } from "../lib/data";
import { autoFit } from "../lib/style";

export default function Footer() {
  const router = useRouter();
  const go = (href: string) => () => router.push(href);

  return (
    <footer style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 20px", display: "grid", gridTemplateColumns: autoFit(190), gap: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 40, width: 40, borderRadius: "50%", background: "#ffffff", boxShadow: "var(--nav-shadow)", flexShrink: 0 }}>
              <img src="/logo-icon.png" alt="BEAPS Mobile Fix" style={{ height: "76%", width: "76%", objectFit: "contain" }} />
            </span>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.03em" }}>BEAPS Mobile Fix</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>All phone repair services</div>
            </div>
          </div>
          <p style={{ margin: "16px 0 0", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 280 }}>Repairs, phones and accessories from the Old Mutual Building, Kimathi Street, Nairobi.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Services</div>
          <button type="button" className="footer-link" onClick={go("/repairs")}>Repairs &amp; prices</button>
          <button type="button" className="footer-link" onClick={go("/quote")}>Instant quote</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Shop</div>
          <button type="button" className="footer-link" onClick={go("/shop")}>Phones</button>
          <button type="button" className="footer-link" onClick={go("/shop")}>Power banks</button>
          <button type="button" className="footer-link" onClick={go("/shop")}>Chargers &amp; cables</button>
          <button type="button" className="footer-link" onClick={go("/shop")}>Cases &amp; protectors</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Contact</div>
          <a href={`tel:${PHONE_TEL}`} className="footer-contact-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span style={{ fontFamily: "'Geist Mono', monospace", letterSpacing: "-0.02em" }}>{PHONE_DISPLAY}</span>
          </a>
          <a href="mailto:bernardmacharia2013@gmail.com" className="footer-contact-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m2 7 10 6 10-6"></path>
            </svg>
            <span style={{ wordBreak: "break-all" }}>bernardmacharia2013@gmail.com</span>
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Old+Mutual+Building+Kimathi+Street+Nairobi"
            target="_blank"
            rel="noreferrer"
            className="footer-contact-row"
            style={{ alignItems: "flex-start" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 1, flexShrink: 0 }}>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Old Mutual Building, Kimathi Street — Room 420, 4th floor</span>
          </a>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 34px", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 12, color: "var(--text-tertiary)" }}>
        <span>© 2026 BEAPS Mobile Fix. All phone repair services.</span>
        <span>Prices are from-prices in KSh and confirmed after a free diagnostic.</span>
      </div>
    </footer>
  );
}
