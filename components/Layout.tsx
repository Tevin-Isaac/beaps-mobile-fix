import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import BottomNav from "./BottomNav";
import WhatsAppButton from "./WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = "BEAPS Mobile Fix — Phone repairs, Nairobi CBD" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Certified phone repair, genuine parts and a 90-day warranty on every job. Old Mutual Building, Kimathi Street, Nairobi." />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <div style={{ minHeight: "100vh", background: "var(--surface-base)", position: "relative", overflowX: "hidden" }}>
        <div
          style={{
            position: "fixed",
            top: -260,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1100,
            height: 520,
            background: "radial-gradient(ellipse at center, rgba(31,161,58,0.20), transparent 68%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <Header />
        <CartDrawer />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
        <Footer />
        <BottomNav />
        <WhatsAppButton />
      </div>
    </>
  );
}
