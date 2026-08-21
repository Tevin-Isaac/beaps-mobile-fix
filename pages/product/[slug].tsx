import type { GetServerSideProps } from "next";
import { money } from "../../lib/data";
import { useCart } from "../../context/CartContext";
import { useSettings } from "../../context/SettingsContext";
import ShareButton from "../../components/ShareButton";
import type { NextPageWithTitle, Product } from "../../lib/types";
import { prisma } from "../../lib/prisma";

interface ProductPageProps {
  product: Product;
}

const ProductPage: NextPageWithTitle<ProductPageProps> = ({ product: p }) => {
  const { addTo } = useCart();
  const { whatsappLink } = useSettings();

  return (
    <div data-screen-label="Product" style={{ maxWidth: 720, margin: "0 auto", padding: "56px 20px 72px" }}>
      <div style={{ border: "1px solid var(--border-subtle)", borderRadius: 24, background: "var(--surface-card)", overflow: "hidden" }}>
        <div style={{ height: 280 }}>
          <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ padding: 28 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange-400)" }}>{p.cat}</span>
          <h1 style={{ margin: "8px 0 0", fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.03em" }}>{p.name}</h1>
          <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--text-secondary)" }}>{p.note}</p>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 28, marginTop: 18, letterSpacing: "-0.02em" }}>KSh {money(p.price)}</div>
          {p.installments && (
            <div style={{ marginTop: 8, fontSize: 13, color: "var(--orange-400)" }}>Lipa Mdogo Mdogo available</div>
          )}
          <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap", alignItems: "center" }}>
            <button type="button" className="btn-solid md" onClick={() => addTo({ id: p.id, name: p.name, price: p.price })}>Add to order</button>
            <a
              href={whatsappLink(`Hi BEAPS, I'd like to ask about this product:\n\n${p.name}\nKSh ${money(p.price)} — ${p.note}`)}
              target="_blank"
              rel="noreferrer"
              className="btn-outline md"
            >
              Ask on WhatsApp
            </a>
            <ShareButton path={`/product/${p.slug}`} title={p.name} className="share-btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const r = await prisma.product.findUnique({ where: { slug } });
  if (!r) return { notFound: true };
  const product: Product = {
    id: r.id,
    slug: r.slug,
    name: r.name,
    cat: r.cat,
    price: r.price,
    tag: r.tag,
    note: r.note,
    image: r.image,
    installments: r.installments,
  };
  return { props: { product } };
};
