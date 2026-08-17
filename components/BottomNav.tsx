import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const PRIMARY_ITEMS = [
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
    icon: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"></path>
    ),
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
];

const MORE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function BottomNav() {
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMoreOpen(false);
  }, [router.pathname]);

  const moreIsActive = MORE_LINKS.some((l) => l.href === router.pathname);

  return (
    <>
      <div className="bottom-nav-spacer" />
      <nav className="bottom-nav">
        {PRIMARY_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className={`bottom-nav-item${router.pathname === item.href ? " is-active" : ""}`}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {item.icon}
            </svg>
            {item.label}
          </Link>
        ))}
        <button type="button" className={`bottom-nav-item${moreIsActive ? " is-active" : ""}`} onClick={() => setMoreOpen(true)} aria-haspopup="true" aria-expanded={moreOpen}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="12" r="1"></circle>
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
          </svg>
          More
        </button>
      </nav>

      {moreOpen && (
        <>
          <div className="more-sheet-backdrop" onClick={() => setMoreOpen(false)} />
          <div className="more-sheet">
            {MORE_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`more-sheet-link${router.pathname === l.href ? " is-active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
