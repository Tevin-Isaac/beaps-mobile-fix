import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import { FEATURED_IDS, PRODUCTS, money } from "../lib/data";
import { autoFit } from "../lib/style";

const FEATURES = [
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </>
    ),
    label: "Same-day repairs",
  },
  {
    icon: (
      <>
        <path d="M9 12h6M12 9v6"></path>
        <circle cx="12" cy="12" r="10"></circle>
      </>
    ),
    label: "Free diagnostics",
  },
  {
    icon: (
      <>
        <path d="M5 18v-6a7 7 0 0 1 14 0v6"></path>
        <rect x="2" y="17" width="6" height="5" rx="2"></rect>
        <rect x="16" y="17" width="6" height="5" rx="2"></rect>
      </>
    ),
    label: "Certified technicians",
  },
  {
    icon: (
      <>
        <path d="M10 17h4V5H2v12h3M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2"></path>
        <circle cx="7.5" cy="17.5" r="2.5"></circle>
        <circle cx="17.5" cy="17.5" r="2.5"></circle>
      </>
    ),
    label: "Pickup & delivery in CBD",
  },
];

const REPAIR_CARDS = [
  { icon: <><rect x="5" y="2" width="14" height="20" rx="2"></rect><path d="m9 7 3 4-2 2 3 4"></path></>, title: "Screen replacement", desc: "Cracked glass, dead touch, lines on the display. Original-grade panels.", price: "from KSh 2,500" },
  { icon: <><rect x="2" y="7" width="16" height="10" rx="2"></rect><path d="M22 11v2M10 10v4"></path></>, title: "Battery & charging", desc: "Dies by noon, won't hold charge, loose charging port.", price: "from KSh 1,200" },
  { icon: <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S12.5 4 12 2c-.5 2-2 4-4 5.5S5 13 5 15a7 7 0 0 0 7 7z"></path>, title: "Water damage", desc: "Ultrasonic board cleaning and component-level drying. Bring it in fast.", price: "from KSh 2,000" },
  { icon: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"></path><circle cx="12" cy="13" r="3"></circle></>, title: "Camera & back glass", desc: "Blurry lens, shattered rear glass, bent housing or frame.", price: "from KSh 1,800" },
  { icon: <><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"></path></>, title: "Motherboard work", desc: "Micro-soldering, no-power, no-network and IC-level faults.", price: "from KSh 3,500" },
  { icon: <><path d="M3 5h18v11H3z"></path><path d="M2 20h20"></path></>, title: "Tablets & laptops", desc: "iPads, Android tablets, laptop screens, keyboards and hinges.", price: "from KSh 2,800" },
];

const HOW_IT_WORKS = [
  { n: "01", title: "Tell us the fault", desc: "Use the instant quote or WhatsApp a photo of the damage." },
  { n: "02", title: "Free diagnostic", desc: "We open it, test it and confirm the exact price before any work." },
  { n: "03", title: "Repair & test", desc: "Genuine parts fitted, then a full function test with you watching." },
  { n: "04", title: "Collect with warranty", desc: "90-day warranty slip, or we deliver it back to you in the CBD." },
];

const TESTIMONIALS = [
  { quote: "Dropped my S21 on Kimathi and had the screen done the same afternoon. They showed me the old panel and tested everything in front of me.", who: "Wanjiru M. · Samsung S21 screen" },
  { quote: "My iPhone went in the rain. Two other shops said buy a new one — BEAPS cleaned the board and it has been fine for months.", who: "Kevin O. · iPhone 12 water damage" },
  { quote: "Traded in my old Redmi against a refurbished iPhone 11 and picked up a power bank. Fair price, no games.", who: "Faith N. · Trade-in + purchase" },
];

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"></path>
    </svg>
  );
}

export default function Home() {
  const router = useRouter();
  const { addTo } = useCart();
  const featured = PRODUCTS.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <div data-screen-label="Home">
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 20px 40px", display: "grid", gridTemplateColumns: autoFit(400), gap: 48, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px", borderRadius: 999, background: "var(--brand-tint)", border: "1px solid var(--orange-a20)", fontSize: 12, color: "var(--orange-300)", letterSpacing: "0.02em" }}>
            Open now · Kimathi St, Nairobi CBD
          </div>
          <h1 style={{ margin: "20px 0 0", fontSize: "clamp(34px, 5.4vw, 60px)", lineHeight: 1.04, fontWeight: 700, letterSpacing: "-0.032em" }}>Cracked screen at 9. Fixed by lunch.</h1>
          <p style={{ margin: "20px 0 0", fontSize: 18, lineHeight: 1.55, color: "var(--text-secondary)", maxWidth: 520 }}>
            Certified technicians, genuine parts and a warranty on every repair — plus phones, power banks and accessories from the same counter. Free diagnostics, walk in without an appointment.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <button type="button" className="btn-solid" onClick={() => router.push("/quote")}>
              Get an instant quote
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </button>
            <button type="button" className="btn-outline" onClick={() => router.push("/quote")}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                <path d="M16 2v4M8 2v4M3 10h18"></path>
              </svg>
              Book a time
            </button>
          </div>
          <div style={{ display: "flex", gap: 26, marginTop: 34, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--orange-400)" }}>45 min</div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 3 }}>Average screen swap</div>
            </div>
            <div style={{ width: 1, background: "var(--border-subtle)" }} />
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--orange-400)" }}>90 days</div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 3 }}>Warranty on parts</div>
            </div>
            <div style={{ width: 1, background: "var(--border-subtle)" }} />
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--orange-400)" }}>8 yrs</div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 3 }}>On Kimathi Street</div>
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: -40, background: "radial-gradient(circle at 60% 40%, rgba(31,161,58,0.28), transparent 65%)", pointerEvents: "none" }} />
          <div className="visual-box" style={{ position: "relative", width: "100%", border: "1px solid var(--border-default)", borderRadius: 18, overflow: "hidden", background: "var(--surface-card)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center", color: "var(--text-tertiary)", fontSize: 13 }}>
            Drop a photo of the bench / a repair in progress
          </div>
          <div className="hero-badge" style={{ position: "absolute", bottom: -18, left: -18, display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 14, background: "rgba(20,20,20,0.9)", backdropFilter: "blur(12px)", border: "1px solid var(--border-default)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Genuine parts only</div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Tested before you leave the shop</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: autoFit(220), gap: 14 }}>
          {FEATURES.map((f) => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", border: "1px solid var(--border-subtle)", borderRadius: 18, background: "var(--surface-card)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {f.icon}
              </svg>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 20px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>What we fix</h2>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--text-secondary)" }}>From-prices in KSh. Final quote after a free diagnostic.</p>
          </div>
          <button type="button" onClick={() => router.push("/repairs")} style={{ fontSize: 14, color: "var(--orange-400)", cursor: "pointer", background: "none", border: "none" }}>
            All repairs &amp; prices →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: autoFit(280), gap: 14, marginTop: 22 }}>
          {REPAIR_CARDS.map((c) => (
            <div key={c.title} className="card">
              <div style={{ width: 42, height: 42, borderRadius: 14, background: "var(--brand-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {c.icon}
                </svg>
              </div>
              <h3 style={{ margin: "14px 0 0", fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>{c.title}</h3>
              <p style={{ margin: "7px 0 0", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>{c.desc}</p>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 15, color: "var(--orange-400)", marginTop: 14, letterSpacing: "-0.02em" }}>{c.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 20px 24px" }}>
        <div style={{ border: "1px solid var(--border-subtle)", borderRadius: 24, background: "var(--surface-card)", padding: 34 }}>
          <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: autoFit(200), gap: 20, marginTop: 26 }}>
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, color: "var(--orange-400)" }}>{s.n}</div>
                <h3 style={{ margin: "8px 0 0", fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 20px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>Counter picks</h2>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--text-secondary)" }}>Phones, power banks and accessories in stock today.</p>
          </div>
          <button type="button" onClick={() => router.push("/shop")} style={{ fontSize: 14, color: "var(--orange-400)", cursor: "pointer", background: "none", border: "none" }}>
            Open the shop →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: autoFit(220), gap: 14, marginTop: 22 }}>
          {featured.map((p) => (
            <div key={p.id} className="product-card">
              <div style={{ height: 150, background: "linear-gradient(150deg, rgba(31,161,58,0.16), rgba(10,10,10,0.9))", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border-subtle)" }}>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{p.cat}</span>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>{p.name}</div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 16, letterSpacing: "-0.02em", marginTop: "auto" }}>KSh {money(p.price)}</div>
                <button type="button" className="add-btn" onClick={() => addTo(p.id)}>Add to order</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 20px 24px" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>What customers say</h2>
        <div style={{ display: "grid", gridTemplateColumns: autoFit(280), gap: 14, marginTop: 22 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.who} style={{ padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 18, background: "var(--surface-card)" }}>
              <div style={{ display: "flex", gap: 3, color: "var(--gold-500)" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.55, color: "var(--text-primary)" }}>{t.quote}</p>
              <div style={{ marginTop: 14, fontSize: 13, color: "var(--text-secondary)" }}>{t.who}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 20px 72px" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            border: "1px solid var(--orange-a20)",
            borderRadius: 24,
            background: "linear-gradient(120deg, rgba(31,161,58,0.16), rgba(20,20,20,0.9))",
            padding: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>Phone acting up? Find out today.</h2>
            <p style={{ margin: "10px 0 0", fontSize: 16, color: "var(--text-secondary)" }}>Old Mutual Building, Kimathi Street — 4th floor, room 420. Mon–Sat, 8:30am–6:30pm.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://wa.me/254720668668" target="_blank" rel="noreferrer" className="btn-solid">WhatsApp the shop</a>
            <button type="button" className="btn-outline" onClick={() => router.push("/contact")}>Directions</button>
          </div>
        </div>
      </section>
    </div>
  );
}

Home.pageTitle = "BEAPS Mobile Fix — Phone repairs, Nairobi CBD";
