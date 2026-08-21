import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cartOpen, toggleCart, hasCart, cartEmpty, cartItems, cartTotalFmt, bump, waLink } = useCart();

  if (!cartOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "var(--scrim-bg)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div onClick={toggleCart} style={{ position: "absolute", inset: 0 }} />
      <div
        className="cart-pop"
        style={{
          position: "relative",
          width: "min(380px, 100%)",
          maxHeight: "min(560px, 85vh)",
          background: "var(--surface-card)",
          border: "1px solid var(--border-default)",
          borderRadius: 24,
          boxShadow: "var(--shadow-lg)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: "-0.03em" }}>Your order</h3>
          <button type="button" onClick={toggleCart} className="icon-btn" aria-label="Close cart" style={{ height: 32, width: 32, borderRadius: 10 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {hasCart && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
              {cartItems.map((ci) => (
                <div key={ci.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--border-subtle)", borderRadius: 14, background: "var(--surface-raised)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ci.name}</div>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "var(--text-secondary)", letterSpacing: "-0.02em", marginTop: 2 }}>KSh {ci.priceFmt}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <button type="button" onClick={() => bump(ci.id, -1)} style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border-default)", borderRadius: 8, cursor: "pointer", fontSize: 14, background: "none", color: "var(--text-primary)" }}>
                      −
                    </button>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, minWidth: 14, textAlign: "center" }}>{ci.qty}</span>
                    <button type="button" onClick={() => bump(ci.id, 1)} style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border-default)", borderRadius: 8, cursor: "pointer", fontSize: 14, background: "none", color: "var(--text-primary)" }}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>Total</span>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>KSh {cartTotalFmt}</span>
            </div>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn-solid sm" style={{ width: "100%" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Send order on WhatsApp
            </a>
            <p style={{ margin: 0, fontSize: 11.5, color: "var(--text-tertiary)", textAlign: "center" }}>We confirm stock and reserve your items. Pay on collection or M-Pesa.</p>
          </>
        )}

        {cartEmpty && (
          <div style={{ padding: "20px 0 4px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)" }}>Nothing here yet.</p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-tertiary)" }}>Add accessories or a phone from the shop.</p>
          </div>
        )}
      </div>
    </div>
  );
}
