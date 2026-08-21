import { ReactNode } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import { useSettings } from "../context/SettingsContext";
import { FEATURED_SLUGS, money } from "../lib/data";
import { autoFit } from "../lib/style";
import type { NextPageWithTitle, Product, Testimonial } from "../lib/types";
import WordReveal from "../components/WordReveal";
import Reveal from "../components/Reveal";
import Avatar from "../components/Avatar";
import { prisma } from "../lib/prisma";

interface FeatureItem {
  icon: ReactNode;
  label: string;
}

const FEATURES: FeatureItem[] = [
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

interface RepairCard {
  icon: ReactNode;
  image: string;
  title: string;
  desc: string;
  price: string;
}

const REPAIR_CARDS: RepairCard[] = [
  { icon: <><rect x="5" y="2" width="14" height="20" rx="2"></rect><path d="m9 7 3 4-2 2 3 4"></path></>, image: "/repairs/screen-replacement.jpg", title: "Screen replacement", desc: "Cracked glass, dead touch, lines on the display. Original-grade panels.", price: "from KSh 2,800" },
  { icon: <><rect x="2" y="7" width="16" height="10" rx="2"></rect><path d="M22 11v2M10 10v4"></path></>, image: "/repairs/battery-charging.jpg", title: "Battery & charging", desc: "Dies by noon, won't hold charge, loose charging port.", price: "from KSh 1,500" },
  { icon: <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S12.5 4 12 2c-.5 2-2 4-4 5.5S5 13 5 15a7 7 0 0 0 7 7z"></path>, image: "/repairs/water-damage.jpg", title: "Water damage", desc: "Ultrasonic board cleaning and component-level drying. Bring it in fast.", price: "from KSh 4,500" },
  { icon: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"></path><circle cx="12" cy="13" r="3"></circle></>, image: "/repairs/camera-repair.jpg", title: "Camera & back glass", desc: "Blurry lens, shattered rear glass, bent housing or frame.", price: "from KSh 2,200" },
  { icon: <><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"></path></>, image: "/repairs/motherboard.jpg", title: "Motherboard work", desc: "Micro-soldering, no-power, no-network and IC-level faults.", price: "from KSh 5,000" },
  { icon: <><path d="M3 5h18v11H3z"></path><path d="M2 20h20"></path></>, image: "/repairs/tablet-repair.jpg", title: "Tablets & laptops", desc: "iPads, Android tablets, laptop screens, keyboards and hinges.", price: "from KSh 3,500" },
];

const HOW_IT_WORKS = [
  { n: "01", title: "Tell us the fault", desc: "Use the instant quote or WhatsApp a photo of the damage." },
  { n: "02", title: "Free diagnostic", desc: "We open it, test it and confirm the exact price before any work." },
  { n: "03", title: "Repair & test", desc: "Genuine parts fitted, then a full function test with you watching." },
  { n: "04", title: "Collect with warranty", desc: "90-day warranty slip, or we deliver it back to you in the CBD." },
];

const TRUST_FACTS = [
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
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </>
    ),
    label: "90-day warranty",
  },
  {
    icon: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2"></rect>
        <path d="m9 7 3 4-2 2 3 4"></path>
      </>
    ),
    label: "Genuine parts only",
  },
  {
    icon: (
      <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"></path>
      </>
    ),
    label: "11+ years experience",
  },
];

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"></path>
    </svg>
  );
}

interface HomeProps {
  featured: Product[];
  testimonials: Testimonial[];
}

const Home: NextPageWithTitle<HomeProps> = ({ featured, testimonials }) => {
  const router = useRouter();
  const { addTo } = useCart();
  const { whatsappLink, addressLine, addressDetail, hours } = useSettings();

  return (
    <div data-screen-label="Home">
      <section className="hero-fullbleed">
        <div className="hero-fullbleed-bg">
          <img src="/hero-repair.jpg" alt="" />
          <div className="hero-fullbleed-scrim" />
        </div>

        <div className="hero-fullbleed-content">
          <h1 className="hero-fullbleed-headline">
            <WordReveal text="Cracked screen?" startDelay={0.3} />
            <br />
            <WordReveal text="Walk out fixed today." startDelay={0.5} accentWords={["fixed"]} />
          </h1>

          <p className="animate-fade-up delay-900 hero-fullbleed-sub">
            Certified technicians, genuine parts, 90-day warranty — plus phones, power banks and accessories at the same counter. No appointment needed, just walk in.
          </p>

          <div className="animate-fade-up delay-900" style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", justifyContent: "center" }}>
            <button type="button" className="btn-glow" onClick={() => router.push("/quote")}>
              Get an instant quote
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </button>
            <button type="button" className="btn-outline-invert" onClick={() => router.push("/quote")}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                <path d="M16 2v4M8 2v4M3 10h18"></path>
              </svg>
              Book a time
            </button>
          </div>
        </div>

        <div className="hero-fullbleed-stats">
          <div className="hero-stat animate-fade-up delay-500">
            <svg className="hero-stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <div className="hero-stat-value">45 min</div>
            <div className="hero-stat-label">Average screen swap</div>
          </div>
          <div className="hero-stat animate-fade-up delay-600">
            <svg className="hero-stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <div className="hero-stat-value">90 days</div>
            <div className="hero-stat-label">Warranty on parts</div>
          </div>
          <div className="hero-stat animate-fade-up delay-700">
            <svg className="hero-stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"></path>
            </svg>
            <div className="hero-stat-value">12k+</div>
            <div className="hero-stat-label">Devices repaired</div>
          </div>
        </div>
      </section>

      <Reveal>
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
      </Reveal>

      <Reveal>
      <section style={{ padding: "48px 0 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>What we fix</h2>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--text-secondary)" }}>From-prices in KSh. Final quote after a free diagnostic.</p>
          </div>
          <button type="button" onClick={() => router.push("/repairs")} style={{ fontSize: 14, color: "var(--orange-400)", cursor: "pointer", background: "none", border: "none" }}>
            All repairs →
          </button>
        </div>

        <div className="fix-marquee-viewport" style={{ marginTop: 26 }}>
          <div className="fix-marquee-track fix-marquee-left">
            {[...REPAIR_CARDS, ...REPAIR_CARDS].map((c, i) => (
              <div key={`fix-${i}`} className="fix-card fix-marquee-card">
                <div className="fix-card-photo">
                  <img src={c.image} alt={c.title} />
                  <div className="fix-card-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </div>
                </div>
                <h3 className="fix-card-title">{c.title}</h3>
                <p className="fix-card-desc">{c.desc}</p>
                <div className="fix-card-price">{c.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 20px 24px" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>How it works</h2>
        <div className="how-steps">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="how-step">
                <div className="how-step-num">{s.n}</div>
                {i < HOW_IT_WORKS.length - 1 && <div className="how-step-line" />}
                <h3 className="how-step-title">{s.title}</h3>
                <p className="how-step-desc">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
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
              <div style={{ height: 150, borderBottom: "1px solid var(--border-subtle)" }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>{p.name}</div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 16, letterSpacing: "-0.02em", marginTop: "auto" }}>KSh {money(p.price)}</div>
                <button type="button" className="add-btn" onClick={() => addTo({ id: p.id, name: p.name, price: p.price })}>Add to order</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 20px 24px" }}>
        {testimonials.length > 0 ? (
          <>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>What customers say</h2>
            <div style={{ display: "grid", gridTemplateColumns: autoFit(280), gap: 14, marginTop: 22 }}>
              {testimonials.map((t) => (
                <div key={t.id} style={{ padding: 22, border: "1px solid var(--border-subtle)", borderRadius: 18, background: "var(--surface-card)" }}>
                  <div style={{ display: "flex", gap: 3, color: "var(--gold-500)" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} />
                    ))}
                  </div>
                  <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.55, color: "var(--text-primary)" }}>{t.quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
                    <Avatar name={t.author} src={t.avatar} size={36} />
                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{t.author} · {t.context}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>Why customers choose us</h2>
            <div style={{ display: "grid", gridTemplateColumns: autoFit(220), gap: 14, marginTop: 22 }}>
              {TRUST_FACTS.map((f) => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", border: "1px solid var(--border-subtle)", borderRadius: 18, background: "var(--surface-card)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{f.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      </Reveal>

      <Reveal>
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 20px 72px" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            border: "1px solid var(--orange-a20)",
            borderRadius: 24,
            padding: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <img
            src="/cta-workbench.jpg"
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(10,26,13,0.55), rgba(6,6,6,0.88))", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#ffffff" }}>Phone acting up? Find out today.</h2>
            <p style={{ margin: "10px 0 0", fontSize: 16, color: "rgba(255,255,255,0.75)" }}>{addressLine} — {addressDetail}. {hours}.</p>
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={whatsappLink("Hi BEAPS, I'd like to ask about a repair.")} target="_blank" rel="noreferrer" className="btn-solid">WhatsApp the shop</a>
            <button type="button" className="btn-outline-invert" onClick={() => router.push("/contact")}>Directions</button>
          </div>
        </div>
      </section>
      </Reveal>
    </div>
  );
};

Home.pageTitle = "BEAPS Mobile Fix — Phone repairs, Nairobi CBD";

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const [rows, testimonialRows] = await Promise.all([
    prisma.product.findMany({ where: { slug: { in: FEATURED_SLUGS } } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const featured: Product[] = FEATURED_SLUGS.map((slug) => bySlug.get(slug))
    .filter((r): r is NonNullable<typeof r> => !!r)
    .map((r) => ({
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
  const testimonials: Testimonial[] = testimonialRows.map((t) => ({
    id: t.id,
    quote: t.quote,
    author: t.author,
    context: t.context,
    avatar: t.avatar,
  }));
  return { props: { featured, testimonials } };
};

export default Home;
