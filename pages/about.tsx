import { autoFit } from "../lib/style";
import type { NextPageWithTitle } from "../lib/types";

const STATS = [
  { n: "8", label: "Years on Kimathi St" },
  { n: "12k+", label: "Devices repaired" },
  { n: "90", label: "Day parts warranty" },
];

const VALUES = [
  { title: "Genuine parts", desc: "Original or original-grade panels and batteries, sourced through suppliers we have used for years." },
  { title: "Your data stays yours", desc: "We do not need your passcode for most repairs, and nothing is copied off your device." },
  { title: "Written warranty", desc: "Every repair leaves with a slip: what was done, which part, and how long it is covered." },
];

const About: NextPageWithTitle = () => {
  return (
    <div data-screen-label="About" style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 20px 72px" }}>
      <div style={{ display: "grid", gridTemplateColumns: autoFit(360), gap: 44, alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>A bench, not a counter</h1>
          <p style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.6, color: "var(--text-secondary)" }}>
            BEAPS Mobile Fix has worked out of the Old Mutual Building on Kimathi Street for eight years. Most of what walks through the door is a cracked screen, a tired battery or a phone that met the rain — and most of it leaves the same day.
          </p>
          <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "var(--text-secondary)" }}>
            We are certified technicians who fit genuine parts, show you the part that came out, and put a 90-day warranty in writing. When a board is beyond economical repair we say so instead of billing you for hope. The same bench sells phones, power banks and accessories, so you can walk out working rather than waiting.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: autoFit(120), gap: 18, marginTop: 30 }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--orange-400)" }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="visual-box" style={{ width: "100%", border: "1px solid var(--border-default)", borderRadius: 24, overflow: "hidden", background: "var(--surface-card)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center", color: "var(--text-tertiary)", fontSize: 13 }}>
          Drop a photo of the shop or the team
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: autoFit(240), gap: 14, marginTop: 44 }}>
        {VALUES.map((v) => (
          <div key={v.title} style={{ padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 18, background: "var(--surface-card)" }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>{v.title}</h3>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.55 }}>{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

About.pageTitle = "About — BEAPS Mobile Fix";

export default About;
