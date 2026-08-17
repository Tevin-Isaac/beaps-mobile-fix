import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import { PHONE_DISPLAY, PHONE_TEL } from "../lib/data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/repairs", label: "Repairs & prices" },
  { href: "/shop", label: "Shop" },
  { href: "/tradein", label: "Trade-in" },
  { href: "/track", label: "Track repair" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const { cartCount, hasCart, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  return (
    <header
      className="animate-fade-in"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(16px)",
        background: "rgba(10,10,10,0.72)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <Link href="/" className="animate-slide-left delay-200" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="BEAPS Mobile Fix"
            style={{
              height: 46,
              width: 46,
              objectFit: "contain",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>BEAPS</span>
            <span style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase", marginTop: 3 }}>Mobile Fix</span>
          </div>
        </Link>

        <nav className="nav-desktop animate-fade-in delay-400" style={{ alignItems: "center", gap: 4, marginLeft: "auto", flexWrap: "nowrap", minWidth: 0 }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link${router.pathname === l.href ? " is-active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="animate-slide-right delay-300" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: "auto" }}>
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"></path>
              </svg>
            ) : (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M3 12h18M3 18h18"></path>
              </svg>
            )}
          </button>
          <button type="button" onClick={toggleCart} className="icon-btn" aria-label="Open cart">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {hasCart && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  minWidth: 20,
                  height: 20,
                  padding: "0 5px",
                  borderRadius: 999,
                  background: "var(--brand-solid)",
                  color: "var(--text-on-brand)",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <a href={`tel:${PHONE_TEL}`} className="btn-solid sm call-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span className="call-btn-label" style={{ fontFamily: "'Geist Mono', monospace", letterSpacing: "-0.02em" }}>{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>

      {menuOpen && (
        <nav className="nav-mobile-panel">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-mobile-link${router.pathname === l.href ? " is-active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
