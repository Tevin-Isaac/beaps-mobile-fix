import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SideMenu from "./SideMenu";

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
    href: "/quote",
    label: "Quote",
    icon: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>,
  },
];

const MORE_ROUTES = ["/about", "/contact"];

export default function BottomNav() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  const moreIsActive = MORE_ROUTES.includes(router.pathname);

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
        <button type="button" className={`bottom-nav-item${moreIsActive ? " is-active" : ""}`} onClick={() => setMenuOpen(true)} aria-haspopup="true" aria-expanded={menuOpen}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          Menu
        </button>
      </nav>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
