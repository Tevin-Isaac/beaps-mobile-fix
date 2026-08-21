import { useState } from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useSession, signIn, signOut } from "next-auth/react";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { money } from "../../lib/data";
import { DEFAULT_SETTINGS, SiteSettings } from "../../context/SettingsContext";
import Avatar from "../../components/Avatar";
import type { NextPageWithTitle, Product, Repair, Testimonial, FlashSale } from "../../lib/types";

interface AdminProps {
  products: Product[];
  repairs: Repair[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  flashSale: FlashSale;
}

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function FlashSalePanel({ initial }: { initial: FlashSale }) {
  const [sale, setSale] = useState(initial);
  const [title, setTitle] = useState(initial.title);
  const [message, setMessage] = useState(initial.message);
  const [endsAt, setEndsAt] = useState(toDatetimeLocal(initial.endsAt));
  const [saving, setSaving] = useState(false);

  const save = async (active: boolean) => {
    setSaving(true);
    const res = await fetch("/api/flash-sale", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        active,
        title,
        message,
        endsAt: endsAt ? new Date(endsAt).toISOString() : null,
      }),
    });
    setSaving(false);
    if (res.ok) setSale(await res.json());
  };

  return (
    <div style={{ padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 20, background: "var(--surface-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Flash sale</h2>
        <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, background: sale.active ? "var(--brand-tint-strong)" : "var(--surface-raised)", color: sale.active ? "var(--orange-300)" : "var(--text-tertiary)" }}>
          {sale.active ? "Live" : "Not running"}
        </span>
      </div>
      <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text-secondary)" }}>
        When live, this replaces the "coming soon" banner on the Shop page with your sale details.
      </p>
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <input className="text-field" placeholder="Title (e.g. Weekend Flash Sale)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          className="text-field"
          placeholder="Message (e.g. 15% off all power banks and earbuds)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          style={{ height: "auto", minHeight: 60, padding: "10px 14px", fontFamily: "inherit", resize: "vertical" }}
        />
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, color: "var(--text-secondary)" }}>
          Ends at (optional)
          <input className="text-field" type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} style={{ maxWidth: 260 }} />
        </label>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
        {!sale.active ? (
          <button type="button" className="btn-solid md" onClick={() => save(true)} disabled={saving || !title}>
            {saving ? "Launching…" : "Launch flash sale"}
          </button>
        ) : (
          <button type="button" className="btn-outline md" onClick={() => save(false)} disabled={saving}>
            {saving ? "Ending…" : "End flash sale"}
          </button>
        )}
        <button type="button" className="btn-outline sm" onClick={() => save(sale.active)} disabled={saving}>
          Save details
        </button>
      </div>
    </div>
  );
}

const SETTINGS_FIELDS: { key: keyof SiteSettings; label: string }[] = [
  { key: "phoneDisplay", label: "Phone (display, e.g. 0720 668 668)" },
  { key: "phoneTel", label: "Phone (tel link, e.g. +254720668668)" },
  { key: "whatsapp", label: "WhatsApp number (digits only, e.g. 254720668668)" },
  { key: "email", label: "Contact email" },
  { key: "addressLine", label: "Address — building & street" },
  { key: "addressDetail", label: "Address — room / floor" },
  { key: "hours", label: "Opening hours" },
];

function SettingsPanel({ initial }: { initial: SiteSettings }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  };

  return (
    <div style={{ padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 20, background: "var(--surface-card)" }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Site details</h2>
      <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text-secondary)" }}>
        Changes here update the phone number, WhatsApp links and location shown everywhere on the site.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 14, marginTop: 18 }}>
        {SETTINGS_FIELDS.map((f) => (
          <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, color: "var(--text-secondary)" }}>
            {f.label}
            <input
              className="text-field"
              value={form[f.key]}
              onChange={(e) => { setForm({ ...form, [f.key]: e.target.value }); setSaved(false); }}
            />
          </label>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18 }}>
        <button type="button" className="btn-solid md" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save site details"}
        </button>
        {saved && <span style={{ fontSize: 13, color: "var(--orange-400)" }}>Saved</span>}
      </div>
    </div>
  );
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
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 14, border: "1px solid var(--border-subtle)", borderRadius: 14, background: "var(--surface-card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={p.image} alt={p.name} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
          <div style={{ fontSize: 11.5, color: "var(--text-tertiary)" }}>{p.cat}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>KSh</span>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-field"
          style={{ flex: 1, height: 36, fontFamily: "'Geist Mono', monospace", fontSize: 13 }}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" className="btn-outline sm" style={{ flex: 1 }} onClick={save} disabled={saving || Number(price) === p.price}>
          {saving ? "Saving…" : "Save"}
        </button>
        <a href={`/product/${p.slug}`} target="_blank" rel="noreferrer" className="btn-outline sm" style={{ flex: 1, textAlign: "center" }} title="Shareable link">Link</a>
      </div>
    </div>
  );
}

function RepairRow({ r, onSaved }: { r: Repair; onSaved: (r: Repair) => void }) {
  const [price, setPrice] = useState(String(r.price));
  const [saving, setSaving] = useState(false);

  const save = async () => {
    const n = Number(price);
    if (!Number.isFinite(n) || n <= 0) return;
    setSaving(true);
    const res = await fetch(`/api/admin/repairs/${r.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: n }),
    });
    setSaving(false);
    if (res.ok) onSaved({ ...r, price: n });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 14, border: "1px solid var(--border-subtle)", borderRadius: 14, background: "var(--surface-card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={r.image} alt={r.name} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
          <div style={{ fontSize: 11.5, color: "var(--text-tertiary)" }}>{r.eta}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>KSh</span>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-field"
          style={{ flex: 1, height: 36, fontFamily: "'Geist Mono', monospace", fontSize: 13 }}
        />
      </div>
      <button type="button" className="btn-outline sm" onClick={save} disabled={saving || Number(price) === r.price}>
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  );
}

const emptyTestimonialForm = { quote: "", author: "", context: "", avatar: "" };

function TestimonialsPanel({ initial }: { initial: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initial);
  const [form, setForm] = useState(emptyTestimonialForm);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const addTestimonial = async () => {
    if (!form.quote || !form.author || !form.context) return;
    setAdding(true);
    const res = await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, avatar: form.avatar || null }),
    });
    setAdding(false);
    if (res.ok) {
      const t = await res.json();
      setTestimonials((prev) => [t, ...prev]);
      setForm(emptyTestimonialForm);
    }
  };

  const remove = async (id: string) => {
    setDeletingId(id);
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2 style={{ margin: "36px 0 0", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Reviews</h2>
      <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text-secondary)" }}>
        Only add real customer feedback here — these show on the home page as genuine reviews. When empty, the site shows a trust-facts strip instead.
      </p>

      {testimonials.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))", gap: 12, marginTop: 16 }}>
          {testimonials.map((t) => (
            <div key={t.id} style={{ padding: 16, border: "1px solid var(--border-subtle)", borderRadius: 14, background: "var(--surface-card)" }}>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                <Avatar name={t.author} src={t.avatar} size={28} />
                <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{t.author} · {t.context}</div>
              </div>
              <button
                type="button"
                className="btn-outline sm"
                style={{ marginTop: 10 }}
                onClick={() => remove(t.id)}
                disabled={deletingId === t.id}
              >
                {deletingId === t.id ? "Removing…" : "Remove"}
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 16, padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 20, background: "var(--surface-card)" }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Add a review</h3>
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          <textarea
            className="text-field"
            placeholder="What the customer said"
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            rows={3}
            style={{ height: "auto", minHeight: 76, padding: "10px 14px", fontFamily: "inherit", resize: "vertical" }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 12 }}>
            <input className="text-field" placeholder="Customer name (e.g. Wanjiru M.)" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <input className="text-field" placeholder="What was fixed (e.g. Samsung S21 screen)" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, color: "var(--text-secondary)" }}>
            Customer photo URL (optional — only use a real photo of this real customer, with their okay)
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={form.author || "?"} src={form.avatar} size={34} />
              <input
                className="text-field"
                placeholder="https://... (leave blank for an initials avatar)"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                style={{ flex: 1 }}
              />
            </div>
          </label>
        </div>
        <button type="button" className="btn-solid md" style={{ marginTop: 14 }} onClick={addTestimonial} disabled={adding}>
          {adding ? "Adding…" : "Add review"}
        </button>
      </div>
    </div>
  );
}

const emptyForm = { name: "", cat: "", price: "", tag: "New", note: "", image: "", installments: false };

const Admin: NextPageWithTitle<AdminProps> = ({ products: initial, repairs: initialRepairs, testimonials, settings, flashSale }) => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState(initial);
  const [repairs, setRepairs] = useState(initialRepairs);
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
      setProducts((prev) => [p, ...prev]);
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
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 20px 72px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em" }}>Admin</h1>
        <button type="button" className="btn-outline sm" onClick={() => signOut()}>Sign out ({session.user?.email})</button>
      </div>

      <div style={{ marginTop: 28 }}>
        <SettingsPanel initial={settings} />
      </div>

      <div style={{ marginTop: 20 }}>
        <FlashSalePanel initial={flashSale} />
      </div>

      <h2 style={{ margin: "36px 0 0", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(230px, 100%), 1fr))", gap: 12, marginTop: 16 }}>
        {products.map((p) => (
          <ProductRow key={p.id} p={p} onSaved={(updated) => setProducts((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))} />
        ))}
      </div>

      <h2 style={{ margin: "36px 0 0", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Repair prices</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(230px, 100%), 1fr))", gap: 12, marginTop: 16 }}>
        {repairs.map((r) => (
          <RepairRow key={r.id} r={r} onSaved={(updated) => setRepairs((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))} />
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <TestimonialsPanel initial={testimonials} />
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
    return {
      props: {
        products: [],
        repairs: [],
        testimonials: [],
        settings: DEFAULT_SETTINGS,
        flashSale: { active: false, title: "Flash Sale", message: "", endsAt: null },
      },
    };
  }
  const [rows, repairRows, testimonialRows, settingRow, saleRow] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.repairService.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.setting.findUnique({ where: { id: "main" } }),
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
  const repairs: Repair[] = repairRows.map((r) => ({
    id: r.id,
    name: r.name,
    covers: r.covers,
    price: r.price,
    eta: r.eta,
    image: r.image,
  }));
  const testimonials: Testimonial[] = testimonialRows.map((t) => ({
    id: t.id,
    quote: t.quote,
    author: t.author,
    context: t.context,
    avatar: t.avatar,
  }));
  const settings: SiteSettings = settingRow
    ? {
        phoneDisplay: settingRow.phoneDisplay,
        phoneTel: settingRow.phoneTel,
        whatsapp: settingRow.whatsapp,
        email: settingRow.email,
        addressLine: settingRow.addressLine,
        addressDetail: settingRow.addressDetail,
        hours: settingRow.hours,
      }
    : DEFAULT_SETTINGS;
  const flashSale: FlashSale = saleRow
    ? { active: saleRow.active, title: saleRow.title, message: saleRow.message, endsAt: saleRow.endsAt ? saleRow.endsAt.toISOString() : null }
    : { active: false, title: "Flash Sale", message: "", endsAt: null };
  return { props: { products, repairs, testimonials, settings, flashSale } };
};
