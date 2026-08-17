import { useRef, useState } from "react";
import { TIMELINE } from "../lib/data";
import type { NextPageWithTitle } from "../lib/types";
import Reveal from "../components/Reveal";

type TrackStatus = "found" | "missing" | null;

const Track: NextPageWithTitle = () => {
  const ticketRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<TrackStatus>(null);

  const lookup = () => {
    const v = (ticketRef.current?.value || "").trim().toUpperCase();
    setStatus(v === "BMF-1042" ? "found" : "missing");
  };

  const timeline = TIMELINE.map((t, i) => ({
    ...t,
    dot: i < 3 ? "var(--brand-solid)" : "var(--neutral-600)",
    glow: i === 2 ? "0 0 12px var(--green-glow)" : "none",
  }));

  return (
    <div data-screen-label="Track repair" style={{ maxWidth: 760, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 className="animate-fade-up" style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>Track your repair</h1>
      <p className="animate-fade-up delay-200" style={{ margin: "14px 0 0", fontSize: 17, color: "var(--text-secondary)" }}>
        Enter the ticket number on your drop-off slip. Try <span style={{ fontFamily: "'Geist Mono', monospace", color: "var(--orange-400)" }}>BMF-1042</span>.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
        <input ref={ticketRef} type="text" placeholder="BMF-0000" className="text-field" style={{ flex: 1, minWidth: 220, height: 52, fontSize: 16, fontFamily: "'Geist Mono', monospace", letterSpacing: "0.04em", background: "var(--surface-card)" }} />
        <button type="button" className="btn-solid md" onClick={lookup}>Check status</button>
      </div>

      {status === "found" && (
        <Reveal>
        <div style={{ marginTop: 26, padding: 26, border: "1px solid var(--border-subtle)", borderRadius: 24, background: "var(--surface-card)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, color: "var(--text-secondary)" }}>BMF-1042</div>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>iPhone 12 · screen replacement</div>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "var(--brand-tint)", border: "1px solid var(--orange-a20)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange-300)" }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--brand-solid)", animation: "beapPulse 2s cubic-bezier(0.4,0,0.2,1) infinite" }} />
              In repair
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 24 }}>
            {timeline.map((t, i) => (
              <div key={t.step} style={{ display: "grid", gridTemplateColumns: "22px 1fr auto", gap: 14, alignItems: "start", paddingBottom: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, paddingTop: 3 }}>
                  <span style={{ width: 11, height: 11, borderRadius: 999, background: t.dot, boxShadow: t.glow }} />
                  {i < timeline.length - 1 && <span style={{ width: 1, flex: 1, minHeight: 22, background: "var(--border-subtle)" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{t.step}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 3 }}>{t.detail}</div>
                </div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "var(--text-tertiary)" }}>{t.at}</div>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 18, borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>Ready for collection today from 4:00pm.</span>
            <a href="https://wa.me/254720668668" target="_blank" rel="noreferrer" className="btn-outline sm">Ask the technician</a>
          </div>
        </div>
        </Reveal>
      )}

      {status === "missing" && (
        <Reveal>
        <div style={{ marginTop: 26, padding: 22, border: "1px solid var(--border-default)", borderRadius: 18, background: "var(--surface-card)", fontSize: 14, color: "var(--text-secondary)" }}>
          No repair found for that number. Check the slip, or WhatsApp us on 0720 668 668 and we will look it up.
        </div>
        </Reveal>
      )}
    </div>
  );
};

Track.pageTitle = "Track your repair — BEAPS Mobile Fix";

export default Track;
