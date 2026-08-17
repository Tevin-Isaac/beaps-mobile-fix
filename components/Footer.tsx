import { useRouter } from "next/router";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "../lib/data";
import { autoFit } from "../lib/style";

export default function Footer() {
  const router = useRouter();
  const go = (href: string) => () => router.push(href);

  return (
    <footer style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 20px", display: "grid", gridTemplateColumns: autoFit(190), gap: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/assets/f27e3daa-731a-4ff3-aeaf-8eb04ed19fb8.jpg" alt="BEAPS Mobile Fix" style={{ height: 40, width: 40, objectFit: "cover", objectPosition: "center 42%", borderRadius: 999, background: "#fff" }} />
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
          <button type="button" className="footer-link" onClick={go("/track")}>Track a repair</button>
          <button type="button" className="footer-link" onClick={go("/tradein")}>Trade-in</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Shop</div>
          <button type="button" className="footer-link" onClick={go("/shop")}>Phones</button>
          <button type="button" className="footer-link" onClick={go("/shop")}>Power banks</button>
          <button type="button" className="footer-link" onClick={go("/shop")}>Chargers &amp; cables</button>
          <button type="button" className="footer-link" onClick={go("/shop")}>Cases &amp; protectors</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Contact</div>
          <a href={`tel:${PHONE_TEL}`} style={{ fontSize: 14, fontFamily: "'Geist Mono', monospace", letterSpacing: "-0.02em" }}>{PHONE_DISPLAY}</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" style={{ fontSize: 14 }}>WhatsApp</a>
          <a href="mailto:bernardmacharia2013@gmail.com" style={{ fontSize: 13 }}>bernardmacharia2013@gmail.com</a>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Room 420, 4th floor</span>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 34px", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 12, color: "var(--text-tertiary)" }}>
        <span>© 2026 BEAPS Mobile Fix. All phone repair services.</span>
        <span>Prices are from-prices in KSh and confirmed after a free diagnostic.</span>
      </div>
    </footer>
  );
}
