import { REPAIRS, money } from "../lib/data";
import { autoFit } from "../lib/style";
import { useSettings } from "../context/SettingsContext";
import type { NextPageWithTitle } from "../lib/types";
import Reveal from "../components/Reveal";

const Repairs: NextPageWithTitle = () => {
  const { whatsappLink } = useSettings();
  const exactEstimateLink = whatsappLink(
    "Hi BEAPS, I'd like an exact estimate for a repair. My device is: "
  );

  return (
    <div data-screen-label="Repairs and prices" style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 className="animate-fade-up" style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>Repairs &amp; prices</h1>
      <p className="animate-fade-up delay-200" style={{ margin: "14px 0 0", fontSize: 17, color: "var(--text-secondary)", maxWidth: 640 }}>
        Every price below is a from-price in Kenya Shillings — the real figure depends on your model and the part grade. Diagnostics are free and we confirm the price before we start.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: autoFit(280), gap: 16, marginTop: 32 }}>
        {REPAIRS.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.08}>
            <div className="product-card" style={{ height: "100%" }}>
              <div style={{ height: 170, overflow: "hidden" }}>
                <img
                  src={r.image}
                  alt={r.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>{r.name}</h3>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.45, flex: 1 }}>{r.covers}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, paddingTop: 10, borderTop: "1px solid var(--border-subtle)" }}>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 15, letterSpacing: "-0.02em", color: "var(--orange-400)" }}>from KSh {money(r.price)}</span>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "var(--text-tertiary)" }}>{r.eta}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
        <a href={exactEstimateLink} target="_blank" rel="noreferrer" className="btn-solid md">Get my exact estimate</a>
        <a href={whatsappLink("Hi BEAPS, I'd like to ask about my model.")} target="_blank" rel="noreferrer" className="btn-outline md">Ask about my model</a>
      </div>

      <div style={{ marginTop: 34, padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 18, background: "var(--surface-card)", display: "flex", gap: 14, alignItems: "flex-start" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4M12 8h.01"></path>
        </svg>
        <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Water damage and motherboard jobs are quoted after inspection — some boards are beyond economical repair, and we will tell you that plainly rather than charge you to find out. Data recovery is attempted before any board work where possible.
        </p>
      </div>
    </div>
  );
};

Repairs.pageTitle = "Repairs & prices — BEAPS Mobile Fix";

export default Repairs;
