import { useMemo, useState } from "react";
import type { GetServerSideProps } from "next";
import { money, chipStyle } from "../lib/data";
import { useCart } from "../context/CartContext";
import { useSettings } from "../context/SettingsContext";
import { autoFit } from "../lib/style";
import type { NextPageWithTitle, Product, FlashSale } from "../lib/types";
import Reveal from "../components/Reveal";
import ShareButton from "../components/ShareButton";
import { prisma } from "../lib/prisma";

interface ShopProps {
  products: Product[];
  flashSale: FlashSale;
}

function FlashSaleBanner({ sale }: { sale: FlashSale }) {
  if (sale.active) {
    const endsText = sale.endsAt
      ? new Date(sale.endsAt).toLocaleString("en-KE", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })
      : null;
    return (
      <div className="flash-banner is-live">
        <div className="flash-banner-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>{sale.title}</div>
          {sale.message && <div style={{ fontSize: 13.5, marginTop: 3, color: "rgba(255,255,255,0.85)" }}>{sale.message}</div>}
        </div>
        {endsText && (
          <div className="flash-banner-ends">
            Ends {endsText}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flash-banner is-teaser">
      <div className="flash-banner-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>Flash Sale</span> — coming soon. Keep an eye on this space.
      </div>
    </div>
  );
}

const Shop: NextPageWithTitle<ShopProps> = ({ products, flashSale }) => {
  const { addTo } = useCart();
  const { whatsappLink } = useSettings();
  const [cat, setCat] = useState("All");

  const cats = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.cat)))], [products]);
  const shown = cat === "All" ? products : products.filter((p) => p.cat === cat);

  return (
    <div data-screen-label="Shop" style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 20px 72px" }}>
      <div className="animate-fade-up page-hero">
        <img src="/shop-hero.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,6,6,0.35), rgba(6,6,6,0.9))", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em", color: "#ffffff" }}>Shop</h1>
          <p style={{ margin: "14px 0 0", fontSize: 17, color: "rgba(255,255,255,0.8)", maxWidth: 560 }}>
            Phones, power banks, chargers and everyday accessories. Add what you want, send the order on WhatsApp, and pay on collection or by M-Pesa.
          </p>
        </div>
      </div>

      <Reveal>
      <div style={{ marginTop: 22 }}>
        <FlashSaleBanner sale={flashSale} />
      </div>
      </Reveal>

      <Reveal delay={0.05}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 14, padding: "16px 18px", border: "1px solid var(--orange-a20)", borderRadius: 16, background: "var(--brand-tint)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
          <rect x="2" y="5" width="20" height="14" rx="2"></rect>
          <path d="M2 10h20"></path>
        </svg>
        <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.55 }}>
          <strong style={{ color: "var(--text-primary)" }}>Lipa Mdogo Mdogo available on phones</strong> — new and refurbished handsets marked below can be paid for in small installments instead of one lump sum. Ask at the counter or on WhatsApp for terms.
        </p>
      </div>
      </Reveal>

      <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginTop: 24 }}>
        {cats.map((c) => (
          <button key={c} type="button" className="chip" style={chipStyle(cat === c)} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: autoFit(240), gap: 18, marginTop: 24 }}>
        {shown.map((p, i) => (
          <Reveal key={p.id} delay={(i % 6) * 0.05}>
            <div className="shop-card">
              <div className="shop-card-media">
                <img src={p.image} alt={p.name} />
                <span className="shop-card-cat">{p.cat}</span>
                <span className="shop-card-tag">{p.tag}</span>
              </div>
              <div className="shop-card-body">
                <div style={{ fontSize: 14.5, fontWeight: 500, lineHeight: 1.35 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.45, marginTop: 4 }}>{p.note}</div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 17, letterSpacing: "-0.02em", marginTop: "auto", paddingTop: 10 }}>KSh {money(p.price)}</div>
                {p.installments && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, alignSelf: "flex-start", fontSize: 10.5, fontWeight: 500, color: "var(--orange-400)", marginTop: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                      <path d="M2 10h20"></path>
                    </svg>
                    Lipa Mdogo Mdogo available
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button type="button" className="add-btn" style={{ flex: 1 }} onClick={() => addTo({ id: p.id, name: p.name, price: p.price })}>Add to order</button>
                  <a
                    href={whatsappLink(`Hi BEAPS, I'd like to ask about this product:\n\n${p.name}\nKSh ${money(p.price)} — ${p.note}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-inquire-btn"
                    aria-label={`Ask about ${p.name} on WhatsApp`}
                    title="Ask on WhatsApp"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </a>
                  <ShareButton path={`/product/${p.slug}`} title={p.name} className="share-btn" />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

Shop.pageTitle = "Shop — BEAPS Mobile Fix";

export default Shop;

export const getServerSideProps: GetServerSideProps<ShopProps> = async () => {
  const [rows, saleRow] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.flashSale.findUnique({ where: { id: "main" } }),
  ]);
  const products: Product[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    cat: r.cat,
    price: r.price,
    tag: r.tag,
    note: r.note,
    image: r.image,
    installments: r.installments,
  }));
  const flashSale: FlashSale = saleRow
    ? { active: saleRow.active, title: saleRow.title, message: saleRow.message, endsAt: saleRow.endsAt ? saleRow.endsAt.toISOString() : null }
    : { active: false, title: "Flash Sale", message: "", endsAt: null };
  return { props: { products, flashSale } };
};
