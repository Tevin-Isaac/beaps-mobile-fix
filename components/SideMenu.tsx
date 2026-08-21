import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";

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
    label: "Repairs",
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
  const { phoneDisplay, phoneTel, whatsapp, addressLine, addressDetail, hours } = useSettings();

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
        <div className="side-menu-glow" />

        <div className="side-menu-head">
          <span className="side-menu-logo">
            <img src="/logo-icon.png" alt="" />
          </span>
          <div style={{ flex: 1, lineHeight: 1.25 }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em" }}>BEAPS Mobile Fix</div>
            <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 2 }}>11+ years fixing phones in Nairobi CBD</div>
          </div>
          <button type="button" className="side-menu-close" onClick={onClose} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <Link href="/quote" className="side-menu-promo" onClick={onClose}>
          <div className="side-menu-promo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>Get an instant quote</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 1 }}>Two taps for a price range</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </Link>

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

        <div className="side-menu-quick-actions">
          <a href={`tel:${phoneTel}`} className="side-menu-tile">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call</span>
            <span className="side-menu-tile-sub">{phoneDisplay}</span>
          </a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="side-menu-tile">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>WhatsApp</span>
            <span className="side-menu-tile-sub">Chat now</span>
          </a>
          <button type="button" className="side-menu-tile" onClick={toggleTheme}>
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
            <span>{theme === "dark" ? "Light" : "Dark"} mode</span>
            <span className="side-menu-tile-sub">Tap to switch</span>
          </button>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`}
          target="_blank"
          rel="noreferrer"
          className="side-menu-location"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{addressLine}</div>
            <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 2 }}>{addressDetail} · {hours}</div>
          </div>
        </a>
      </aside>
    </>
  );
}
