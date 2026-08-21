import { autoFit } from "../lib/style";
import type { NextPageWithTitle } from "../lib/types";
import Reveal from "../components/Reveal";

const STATS = [
  { n: "11+", label: "Years in the industry" },
  { n: "12k+", label: "Devices repaired" },
  { n: "90", label: "Day parts warranty" },
];

const VALUES = [
  { title: "Genuine parts", desc: "Original or original-grade panels and batteries, sourced through suppliers we have used for years." },
  { title: "Your data stays yours", desc: "We do not need your passcode for most repairs, and nothing is copied off your device." },
  { title: "Written warranty", desc: "Every repair leaves with a slip: what was done, which part, and how long it is covered." },
  { title: "We come to you", desc: "Can't get to Kimathi Street? We collect your device from your home or office, repair it at the bench, and deliver it back to you." },
];

const About: NextPageWithTitle = () => {
  return (
    <div data-screen-label="About" style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 20px 72px" }}>
      <div style={{ display: "grid", gridTemplateColumns: autoFit(360), gap: 44, alignItems: "center" }}>
        <div>
          <h1 className="animate-fade-up" style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>A bench, not a counter</h1>
          <p className="animate-fade-up delay-200" style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.6, color: "var(--text-secondary)" }}>
            BEAPS Mobile Fix has been repairing phones for over 11 years, now working out of the Old Mutual Building on Kimathi Street. Most jobs are a cracked screen, a tired battery, or water damage. Most leave the same day.
          </p>
          <p className="animate-fade-up delay-300" style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "var(--text-secondary)" }}>
            Every job starts with a free diagnostic, so you know the cost before we touch anything. You see the faulty part come out yourself. If a board can't be fixed economically, we'll tell you straight instead of charging you to find out.
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
        <div className="visual-box" style={{ width: "100%", border: "1px solid var(--border-default)", borderRadius: 24, overflow: "hidden", background: "var(--surface-card)" }}>
          <img
            src="/about-shop.jpg"
            alt="A BEAPS Mobile Fix technician repairing a phone at the workbench"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
          />
        </div>
      </div>

      <Reveal>
      <div style={{ display: "grid", gridTemplateColumns: autoFit(240), gap: 14, marginTop: 44 }}>
        {VALUES.map((v) => (
          <div key={v.title} style={{ padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 18, background: "var(--surface-card)" }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>{v.title}</h3>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.55 }}>{v.desc}</p>
          </div>
        ))}
      </div>
      </Reveal>
    </div>
  );
};

About.pageTitle = "About - BEAPS Mobile Fix";

export default About;
