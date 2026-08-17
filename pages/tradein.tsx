import { useState } from "react";
import { TI_DEVICES, TI_CONDS, chipStyle, money, round100 } from "../lib/data";
import { autoFit } from "../lib/style";
import type { NextPageWithTitle } from "../lib/types";
import Reveal from "../components/Reveal";

const Tradein: NextPageWithTitle = () => {
  const [tiDev, setTiDev] = useState<string | null>(null);
  const [tiCond, setTiCond] = useState<string | null>(null);

  const selectedDevice = TI_DEVICES.find((d) => d.id === tiDev);
  const selectedCond = TI_CONDS.find((c) => c.id === tiCond);

  let offer = "—";
  let offerLabel = "Pick a device and condition for an indicative offer";
  if (selectedDevice && selectedCond) {
    const val = round100(selectedDevice.base * selectedCond.mult);
    offer = `KSh ${money(round100(val * 0.85))} – ${money(val)}`;
    offerLabel = `${selectedDevice.label} · ${selectedCond.label.toLowerCase()}`;
  }

  return (
    <div data-screen-label="Trade-in" style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 className="animate-fade-up" style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>Sell or trade in your phone</h1>
      <p className="animate-fade-up delay-200" style={{ margin: "14px 0 0", fontSize: 17, color: "var(--text-secondary)", maxWidth: 620 }}>
        We buy working and repairable phones, and take them off the price of anything in the shop. Pick your device and condition for an indicative offer.
      </p>

      <Reveal>
      <div style={{ marginTop: 32, padding: 26, border: "1px solid var(--border-subtle)", borderRadius: 24, background: "var(--surface-card)" }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Your device</div>
        <div style={{ display: "grid", gridTemplateColumns: autoFit(200), gap: 12, marginTop: 14 }}>
          {TI_DEVICES.map((d) => (
            <div key={d.id} onClick={() => setTiDev(d.id)} style={{ padding: 16, borderRadius: 14, border: "1px solid", cursor: "pointer", ...chipStyle(tiDev === d.id) }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{d.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 5 }}>{d.ex}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)", marginTop: 28 }}>Condition</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          {TI_CONDS.map((c) => (
            <button key={c.id} type="button" className="chip" style={chipStyle(tiCond === c.id)} onClick={() => setTiCond(c.id)}>
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 28, padding: 22, borderRadius: 18, border: "1px solid var(--orange-a20)", background: "linear-gradient(120deg, rgba(31,161,58,0.14), rgba(10,10,10,0.6))" }}>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{offerLabel}</div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", marginTop: 6 }}>{offer}</div>
          <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 8 }}>Final offer after inspection. Bring your ID and, if you have it, the box.</div>
        </div>

        <a href="https://wa.me/254720668668" target="_blank" rel="noreferrer" className="btn-solid md" style={{ marginTop: 20 }}>Send photos on WhatsApp</a>
      </div>
      </Reveal>
    </div>
  );
};

Tradein.pageTitle = "Trade-in — BEAPS Mobile Fix";

export default Tradein;
