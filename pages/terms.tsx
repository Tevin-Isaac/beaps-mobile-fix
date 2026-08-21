import type { CSSProperties } from "react";
import { useSettings } from "../context/SettingsContext";
import type { NextPageWithTitle } from "../lib/types";

const SECTION_STYLE: CSSProperties = { marginTop: 28 };
const H2_STYLE: CSSProperties = { margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" };
const P_STYLE: CSSProperties = { margin: "10px 0 0", fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.7 };
const LI_STYLE: CSSProperties = { marginTop: 8 };

const Terms: NextPageWithTitle = () => {
  const { email, addressLine, addressDetail } = useSettings();

  return (
    <div data-screen-label="Terms of service" style={{ maxWidth: 760, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 style={{ margin: 0, fontSize: "clamp(28px, 4.2vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em" }}>Terms of service</h1>
      <p style={{ margin: "14px 0 0", fontSize: 15, color: "var(--text-tertiary)" }}>Last updated 21 August 2026.</p>

      <p style={P_STYLE}>
        These are the general terms for using this website and booking a repair, quote or shop order through it. They're written in
        plain language for clarity, not as a substitute for formal legal advice — for anything binding or disputed, we'd rely on a
        proper legal review rather than this page alone.
      </p>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Prices and quotes</h2>
        <p style={P_STYLE}>
          Prices shown on this site — for repairs, products and the instant quote calculator — are from-prices and estimates. The
          final price depends on your exact device, model and the part grade required, and is always confirmed with you after a free
          diagnostic, before any work begins.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Bookings</h2>
        <p style={P_STYLE}>
          Submitting the Instant Quote booking form is a request for a slot, not a confirmed appointment. We follow up on WhatsApp or
          by phone to confirm the time. You're welcome to walk in without a booking during opening hours.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Warranty</h2>
        <p style={P_STYLE}>
          Parts we fit carry a 90-day warranty against faulty workmanship or defective parts, confirmed on a written slip given at
          collection. The warranty does not cover new physical damage (drops, water) after the repair.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Your device and your data</h2>
        <ul style={{ ...P_STYLE, paddingLeft: 20 }}>
          <li style={LI_STYLE}>Please back up anything important before handing over your device — we take care during repairs, but we can't guarantee against data loss, especially on devices that arrive already faulty (e.g. water damage, no power).</li>
          <li style={LI_STYLE}>For most repairs we don't need your passcode. If a repair does require it, it's used only for that job and never recorded.</li>
          <li style={LI_STYLE}>If a device is assessed as beyond economical repair, we'll tell you plainly rather than charge for further work.</li>
        </ul>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Shop orders</h2>
        <p style={P_STYLE}>
          Adding items to your order on the Shop page and sending it via WhatsApp is a request to reserve stock, not a completed sale
          — payment and collection are arranged directly with us, on collection or by M-Pesa.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Contact</h2>
        <p style={P_STYLE}>
          Questions about these terms: <a href={`mailto:${email}`} style={{ color: "var(--orange-400)" }}>{email}</a>, or visit us at{" "}
          {addressLine} — {addressDetail}.
        </p>
      </section>
    </div>
  );
};

Terms.pageTitle = "Terms of service — BEAPS Mobile Fix";

export default Terms;
