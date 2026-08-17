import { useMemo, useState } from "react";
import { PRODUCTS, money, chipStyle } from "../lib/data";
import { useCart } from "../context/CartContext";
import { autoFit } from "../lib/style";

export default function Shop() {
  const { addTo } = useCart();
  const [cat, setCat] = useState("All");

  const cats = useMemo(() => ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.cat)))], []);
  const shown = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);

  return (
    <div data-screen-label="Shop" style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>Shop</h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: "var(--text-secondary)", maxWidth: 620 }}>
        Phones, power banks, chargers and everyday accessories. Add what you want, send the order on WhatsApp, and pay on collection or by M-Pesa.
      </p>

      <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginTop: 28 }}>
        {cats.map((c) => (
          <button key={c} type="button" className="chip" style={chipStyle(cat === c)} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: autoFit(220), gap: 14, marginTop: 24 }}>
        {shown.map((p) => (
          <div key={p.id} className="product-card">
            <div style={{ height: 160, background: "linear-gradient(150deg, rgba(31,161,58,0.16), rgba(10,10,10,0.9))", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: 14, borderBottom: "1px solid var(--border-subtle)" }}>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{p.cat}</span>
              <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 999, background: "var(--brand-tint)", color: "var(--orange-300)" }}>{p.tag}</span>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.45 }}>{p.note}</div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 16, letterSpacing: "-0.02em", marginTop: "auto" }}>KSh {money(p.price)}</div>
              <button type="button" className="add-btn" onClick={() => addTo(p.id)}>Add to order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Shop.pageTitle = "Shop — BEAPS Mobile Fix";
