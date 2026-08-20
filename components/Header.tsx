import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { PHONE_DISPLAY, PHONE_TEL } from "../lib/data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/repairs", label: "Repairs & prices" },
  { href: "/shop", label: "Shop" },
  { href: "/tradein", label: "Trade-in" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const { cartCount, hasCart, toggleCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="animate-fade-in"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(16px)",
        background: "var(--header-bg)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <Link href="/" className="logo-badge animate-slide-left delay-200" style={{ flexShrink: 0 }} aria-label="BEAPS Mobile Fix home">
          <img src="/logo.png" alt="" width={52} height={52} />
        </Link>

        <nav className="nav-desktop nav-pill animate-fade-in delay-400" style={{ marginLeft: "auto" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link${router.pathname === l.href ? " is-active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="animate-slide-right delay-300" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: "auto" }}>
          <button
            type="button"
            className="icon-btn"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </svg>
            ) : (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
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
    </header>
  );
}
