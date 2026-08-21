import { useState } from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useSession, signIn, signOut } from "next-auth/react";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { money } from "../../lib/data";
import type { NextPageWithTitle, Product } from "../../lib/types";

interface AdminProps {
  products: Product[];
}

function ProductRow({ p, onSaved }: { p: Product; onSaved: (p: Product) => void }) {
  const [price, setPrice] = useState(String(p.price));
  const [saving, setSaving] = useState(false);

  const save = async () => {
    const n = Number(price);
    if (!Number.isFinite(n) || n <= 0) return;
    setSaving(true);
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: n }),
    });
    setSaving(false);
    if (res.ok) onSaved({ ...p, price: n });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", border: "1px solid var(--border-subtle)", borderRadius: 14, background: "var(--surface-card)" }}>
      <img src={p.image} alt={p.name} style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</div>
        <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{p.cat}</div>
      </div>
      <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>KSh</span>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="text-field"
        style={{ width: 100, height: 38, fontFamily: "'Geist Mono', monospace" }}
      />
      <button type="button" className="btn-outline sm" onClick={save} disabled={saving || Number(price) === p.price}>
        {saving ? "Saving…" : "Save"}
      </button>
      <a href={`/product/${p.slug}`} target="_blank" rel="noreferrer" className="btn-outline sm" title="Shareable link">Link</a>
    </div>
  );
}

const emptyForm = { name: "", cat: "", price: "", tag: "New", note: "", image: "", installments: false };

const Admin: NextPageWithTitle<AdminProps> = ({ products: initial }) => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState(initial);
  const [form, setForm] = useState(emptyForm);
  const [adding, setAdding] = useState(false);

  const addProduct = async () => {
    if (!form.name || !form.cat || !form.price || !form.image) return;
    setAdding(true);
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    setAdding(false);
    if (res.ok) {
      const p = await res.json();
      setProducts((prev) => [...prev, p]);
      setForm(emptyForm);
    }
  };

  if (status === "loading") {
    return <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px" }}>Loading…</div>;
  }

  if (status === "unauthenticated" || !session?.user?.isAdmin) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px 72px" }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>Admin</h1>
        <p style={{ margin: "14px 0 0", color: "var(--text-secondary)" }}>
          {status === "unauthenticated" ? "Sign in with an admin Google account to manage products." : "This account doesn't have admin access."}
        </p>
        {status === "unauthenticated" && (
          <button type="button" className="btn-solid md" style={{ marginTop: 20 }} onClick={() => signIn("google")}>Sign in with Google</button>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px 72px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em" }}>Admin — Products</h1>
        <button type="button" className="btn-outline sm" onClick={() => signOut()}>Sign out ({session.user?.email})</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
        {products.map((p) => (
          <ProductRow key={p.id} p={p} onSaved={(updated) => setProducts((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))} />
        ))}
      </div>

      <div style={{ marginTop: 36, padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 20, background: "var(--surface-card)" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Add a product</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 12, marginTop: 16 }}>
          <input className="text-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="text-field" placeholder="Category" value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} />
          <input className="text-field" placeholder="Price (KSh)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input className="text-field" placeholder="Tag (e.g. New)" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
          <input className="text-field" placeholder="Image path (e.g. /products/new-phones.jpg)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <input className="text-field" placeholder="Note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13, color: "var(--text-secondary)" }}>
          <input type="checkbox" checked={form.installments} onChange={(e) => setForm({ ...form, installments: e.target.checked })} />
          Lipa Mdogo Mdogo available
        </label>
        <button type="button" className="btn-solid md" style={{ marginTop: 16 }} onClick={addProduct} disabled={adding}>
          {adding ? "Adding…" : "Add product"}
        </button>
      </div>
    </div>
  );
};

Admin.pageTitle = "Admin — BEAPS Mobile Fix";

export default Admin;

export const getServerSideProps: GetServerSideProps<AdminProps> = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session?.user?.isAdmin) {
    return { props: { products: [] } };
  }
  const rows = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
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
  return { props: { products } };
};
