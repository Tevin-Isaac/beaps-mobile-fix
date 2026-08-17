import { useRouter } from "next/router";
import { REPAIRS, money } from "../lib/data";
import type { NextPageWithTitle } from "../lib/types";

const Repairs: NextPageWithTitle = () => {
  const router = useRouter();

  return (
    <div data-screen-label="Repairs and prices" style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>Repairs &amp; prices</h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: "var(--text-secondary)", maxWidth: 640 }}>
        Every price below is a from-price in Kenya Shillings — the real figure depends on your model and the part grade. Diagnostics are free and we confirm the price before we start.
      </p>

      <div style={{ marginTop: 32, border: "1px solid var(--border-subtle)", borderRadius: 18, background: "var(--surface-card)", overflow: "hidden", overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 0.7fr 0.7fr", minWidth: 680, gap: 16, padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
          <span>Repair</span>
          <span>What it covers</span>
          <span style={{ textAlign: "right" }}>From</span>
          <span style={{ textAlign: "right" }}>Turnaround</span>
        </div>
        {REPAIRS.map((r) => (
          <div key={r.name} className="repair-row">
            <span style={{ fontSize: 15, fontWeight: 500 }}>{r.name}</span>
            <span style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.45 }}>{r.covers}</span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 15, textAlign: "right", letterSpacing: "-0.02em", color: "var(--orange-400)" }}>KSh {money(r.price)}</span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, textAlign: "right", color: "var(--text-secondary)" }}>{r.eta}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
        <button type="button" className="btn-solid md" onClick={() => router.push("/quote")}>Get my exact estimate</button>
        <a href="https://wa.me/254720668668" target="_blank" rel="noreferrer" className="btn-outline md">Ask about my model</a>
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
