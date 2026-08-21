import type { GetServerSideProps } from "next";
import { money } from "../lib/data";
import { autoFit } from "../lib/style";
import { useSettings } from "../context/SettingsContext";
import type { NextPageWithTitle, Repair } from "../lib/types";
import Reveal from "../components/Reveal";
import { prisma } from "../lib/prisma";

interface RepairsProps {
  repairs: Repair[];
}

const Repairs: NextPageWithTitle<RepairsProps> = ({ repairs }) => {
  const { whatsappLink } = useSettings();
  const exactEstimateLink = whatsappLink(
    "Hi BEAPS, I'd like an exact estimate for a repair. My device is: "
  );

  return (
    <div data-screen-label="Repairs" style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 20px 72px" }}>
      <div className="animate-fade-up page-hero">
        <img src="/repairs-hero.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,6,6,0.35), rgba(6,6,6,0.9))", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em", color: "#ffffff" }}>Repairs</h1>
          <p style={{ margin: "14px 0 0", fontSize: 17, color: "rgba(255,255,255,0.8)", maxWidth: 560 }}>
            Every price below is a from-price in Kenya Shillings — the real figure depends on your model and the part grade. Diagnostics are free and we confirm the price before we start.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: autoFit(280), gap: 16, marginTop: 32 }}>
        {repairs.map((r, i) => (
          <Reveal key={r.id} delay={(i % 3) * 0.08}>
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

Repairs.pageTitle = "Repairs — BEAPS Mobile Fix";

export default Repairs;

export const getServerSideProps: GetServerSideProps<RepairsProps> = async () => {
  const rows = await prisma.repairService.findMany({ orderBy: { createdAt: "asc" } });
  const repairs: Repair[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    covers: r.covers,
    price: r.price,
    eta: r.eta,
    image: r.image,
  }));
  return { props: { repairs } };
};
