import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cartOpen, toggleCart, hasCart, cartEmpty, cartItems, cartTotalFmt, bump, waLink } = useCart();

  if (!cartOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(5,5,5,0.72)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "flex-end" }}>
      <div onClick={toggleCart} style={{ position: "absolute", inset: 0 }} />
      <div
        style={{
          position: "relative",
          width: "min(420px, 100%)",
          height: "100%",
          background: "var(--surface-card)",
          borderLeft: "1px solid var(--border-default)",
          padding: 22,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-0.03em" }}>Your order</h3>
          <button type="button" onClick={toggleCart} style={{ cursor: "pointer", color: "var(--text-secondary)", fontSize: 22, lineHeight: 1, padding: "4px 8px", background: "none", border: "none" }}>
            ×
          </button>
        </div>

        {hasCart && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cartItems.map((ci) => (
                <div key={ci.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid var(--border-subtle)", borderRadius: 14, background: "var(--surface-raised)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{ci.name}</div>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "var(--text-secondary)", letterSpacing: "-0.02em", marginTop: 3 }}>KSh {ci.priceFmt}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button type="button" onClick={() => bump(ci.id, -1)} style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border-default)", borderRadius: 10, cursor: "pointer", fontSize: 16, background: "none", color: "var(--text-primary)" }}>
                      −
                    </button>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 14, minWidth: 16, textAlign: "center" }}>{ci.qty}</span>
                    <button type="button" onClick={() => bump(ci.id, 1)} style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border-default)", borderRadius: 10, cursor: "pointer", fontSize: 16, background: "none", color: "var(--text-primary)" }}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border-subtle)", marginTop: "auto" }}>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Total</span>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>KSh {cartTotalFmt}</span>
            </div>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn-solid md" style={{ width: "100%" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Send order on WhatsApp
            </a>
            <p style={{ margin: 0, fontSize: 12, color: "var(--text-tertiary)", textAlign: "center" }}>We confirm stock and reserve your items. Pay on collection or M-Pesa.</p>
          </>
        )}

        {cartEmpty && <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)" }}>Nothing here yet. Add accessories or a phone from the shop.</p>}
      </div>
    </div>
  );
}
