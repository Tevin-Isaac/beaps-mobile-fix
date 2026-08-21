import type { CSSProperties } from "react";
import { useSettings } from "../context/SettingsContext";
import type { NextPageWithTitle } from "../lib/types";

const SECTION_STYLE: CSSProperties = { marginTop: 28 };
const H2_STYLE: CSSProperties = { margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" };
const P_STYLE: CSSProperties = { margin: "10px 0 0", fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.7 };
const LI_STYLE: CSSProperties = { marginTop: 8 };

const Privacy: NextPageWithTitle = () => {
  const { email } = useSettings();

  return (
    <div data-screen-label="Privacy policy" style={{ maxWidth: 760, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 style={{ margin: 0, fontSize: "clamp(28px, 4.2vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em" }}>Privacy policy</h1>
      <p style={{ margin: "14px 0 0", fontSize: 15, color: "var(--text-tertiary)" }}>Last updated 21 August 2026.</p>

      <p style={P_STYLE}>
        This page explains what information BEAPS Mobile Fix collects through this website, why, and how it is used. It covers this
        website only. What happens to your device once it's physically at the shop is covered by the repair terms we agree
        with you in person.
      </p>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>What we collect</h2>
        <p style={P_STYLE}>Depending on how you use the site, we may collect:</p>
        <ul style={{ ...P_STYLE, paddingLeft: 20 }}>
          <li style={LI_STYLE}>Your name, phone number, device model and a description of the fault, submitted through the Instant Quote booking form.</li>
          <li style={LI_STYLE}>Your name, email address and profile photo, only if you sign in with Google as an admin to manage the site.</li>
          <li style={LI_STYLE}>A theme preference (light or dark) saved in your browser's local storage. This never leaves your device.</li>
        </ul>
        <p style={P_STYLE}>
          We do not use tracking cookies, ad pixels, or any third-party analytics on this site at this time.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Why we collect it</h2>
        <p style={P_STYLE}>
          Booking details are used to schedule and follow up on your repair or quote request. Admin sign-in details are used only to
          check whether your account has admin access. We don't use anything for marketing.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Where it's stored</h2>
        <p style={P_STYLE}>
          Booking and admin account data is stored in a Postgres database hosted by Neon, with the website itself hosted on Vercel.
          Admin sign-in is handled by Google, so we never see or store any Google password. We don't sell, rent, or share your
          information with any other third party.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>WhatsApp</h2>
        <p style={P_STYLE}>
          Buttons across the site that say "WhatsApp" or "Ask on WhatsApp" open a chat with our WhatsApp Business number in a new tab.
          Anything you send there is handled under WhatsApp's own privacy policy, not this one.
        </p>
      </section>

      <section style={SECTION_STYLE}>
        <h2 style={H2_STYLE}>Your rights</h2>
        <p style={P_STYLE}>
          You can ask us what information we hold about you, or ask us to correct or delete it, at any time by emailing{" "}
          <a href={`mailto:${email}`} style={{ color: "var(--orange-400)" }}>{email}</a>.
        </p>
      </section>
    </div>
  );
};

Privacy.pageTitle = "Privacy policy - BEAPS Mobile Fix";

export default Privacy;
