import { useMemo, useState } from "react";
import { PRODUCTS, money, chipStyle } from "../lib/data";
import { useCart } from "../context/CartContext";
import { autoFit } from "../lib/style";
import type { NextPageWithTitle } from "../lib/types";
import Reveal from "../components/Reveal";

const Shop: NextPageWithTitle = () => {
  const { addTo } = useCart();
  const [cat, setCat] = useState("All");

  const cats = useMemo(() => ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.cat)))], []);
  const shown = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);

  return (
    <div data-screen-label="Shop" style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 className="animate-fade-up" style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>Shop</h1>
      <p className="animate-fade-up delay-200" style={{ margin: "14px 0 0", fontSize: 17, color: "var(--text-secondary)", maxWidth: 620 }}>
        Phones, power banks, chargers and everyday accessories. Add what you want, send the order on WhatsApp, and pay on collection or by M-Pesa.
      </p>

      <div className="animate-fade-up delay-300" style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 24, padding: "16px 18px", border: "1px solid var(--orange-a20)", borderRadius: 16, background: "var(--brand-tint)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
          <rect x="2" y="5" width="20" height="14" rx="2"></rect>
          <path d="M2 10h20"></path>
        </svg>
        <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.55 }}>
          <strong style={{ color: "var(--text-primary)" }}>Lipa Mdogo Mdogo available on phones</strong> — new and refurbished handsets marked below can be paid for in small installments instead of one lump sum. Ask at the counter or on WhatsApp for terms.
        </p>
      </div>

      <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginTop: 24 }}>
        {cats.map((c) => (
          <button key={c} type="button" className="chip" style={chipStyle(cat === c)} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <Reveal>
      <div style={{ display: "grid", gridTemplateColumns: autoFit(220), gap: 14, marginTop: 24 }}>
        {shown.map((p) => (
          <div key={p.id} className="product-card">
            <div style={{ position: "relative", height: 160, borderBottom: "1px solid var(--border-subtle)" }}>
              <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span style={{ position: "absolute", top: 10, left: 10, fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 8px", borderRadius: 999, background: "rgba(10,10,10,0.72)", backdropFilter: "blur(4px)", color: "var(--text-secondary)" }}>{p.cat}</span>
              <span style={{ position: "absolute", top: 10, right: 10, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 999, background: "var(--brand-tint-strong)", color: "var(--orange-300)", backdropFilter: "blur(4px)" }}>{p.tag}</span>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.45 }}>{p.note}</div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 16, letterSpacing: "-0.02em", marginTop: "auto" }}>KSh {money(p.price)}</div>
              {p.installments && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, alignSelf: "flex-start", fontSize: 10.5, fontWeight: 500, color: "var(--orange-400)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <path d="M2 10h20"></path>
                  </svg>
                  Lipa Mdogo Mdogo available
                </div>
              )}
              <button type="button" className="add-btn" onClick={() => addTo(p.id)}>Add to order</button>
            </div>
          </div>
        ))}
      </div>
      </Reveal>
    </div>
  );
};

Shop.pageTitle = "Shop — BEAPS Mobile Fix";

export default Shop;
