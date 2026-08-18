import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../context/ThemeContext";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "../lib/data";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    icon: (
      <>
        <path d="M3 12l9-9 9 9"></path>
        <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"></path>
      </>
    ),
  },
  {
    href: "/repairs",
    label: "Repairs & prices",
    icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"></path>,
  },
  {
    href: "/shop",
    label: "Shop",
    icon: (
      <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
        <path d="M3 6h18"></path>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </>
    ),
  },
  {
    href: "/tradein",
    label: "Trade-in",
    icon: (
      <>
        <path d="M8 3 4 7l4 4"></path>
        <path d="M4 7h16"></path>
        <path d="m16 21 4-4-4-4"></path>
        <path d="M20 17H4"></path>
      </>
    ),
  },
  {
    href: "/about",
    label: "About",
    icon: (
      <>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4M12 8h.01"></path>
      </>
    ),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </>
    ),
  },
];

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function SideMenu({ open, onClose }: SideMenuProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className={`side-menu-backdrop${open ? " is-open" : ""}`} onClick={onClose} />
      <aside className={`side-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="side-menu-head">
          <img src="/logo.png" alt="" className="side-menu-logo" />
          <div style={{ flex: 1, lineHeight: 1.2 }}>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.03em" }}>BEAPS</div>
            <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--text-tertiary)", textTransform: "uppercase", marginTop: 2 }}>Mobile Fix</div>
          </div>
          <button type="button" className="side-menu-close" onClick={onClose} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav className="side-menu-nav">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`side-menu-link${router.pathname === item.href ? " is-active" : ""}`}
              style={{ transitionDelay: open ? `${60 + i * 30}ms` : "0ms" }}
              onClick={onClose}
            >
              <span className="side-menu-link-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="side-menu-chevron">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </Link>
          ))}
        </nav>

        <button type="button" className="side-menu-theme" onClick={toggleTheme}>
          {theme === "dark" ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
          Switch to {theme === "dark" ? "light" : "dark"} mode
        </button>

        <div className="side-menu-actions">
          <a href={`tel:${PHONE_TEL}`} className="btn-solid sm" style={{ width: "100%" }}>
            Call {PHONE_DISPLAY}
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="btn-outline sm" style={{ width: "100%" }}>
            WhatsApp us
          </a>
        </div>

        <div className="side-menu-info">
          <div>Old Mutual Building, Kimathi Street — 4th floor, room 420</div>
          <div style={{ marginTop: 4 }}>Mon–Fri 8:30am–6:30pm · Sat 9:00am–5:00pm</div>
        </div>
      </aside>
    </>
  );
}
