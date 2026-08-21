import { ReactNode, useRef, useState } from "react";
import { DEVICES, ISSUES, chipStyle, money, round100 } from "../lib/data";
import { autoFit } from "../lib/style";
import { useSettings } from "../context/SettingsContext";
import type { NextPageWithTitle, Booking } from "../lib/types";
import Reveal from "../components/Reveal";

const DEVICE_ICONS: Record<string, ReactNode> = {
  budget: <><rect x="7" y="2" width="10" height="20" rx="2"></rect><path d="M11 18h2"></path></>,
  flagship: <><rect x="7" y="2" width="10" height="20" rx="2"></rect><path d="m11 7 1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L7 9.3 9 9z"></path></>,
  iphone: <><rect x="7" y="2" width="10" height="20" rx="2"></rect><circle cx="12" cy="18.5" r="1"></circle></>,
  tablet: <><rect x="4" y="2" width="16" height="20" rx="2"></rect><path d="M12 18h.01"></path></>,
  laptop: <><path d="M3 5h18v11H3z"></path><path d="M2 20h20"></path></>,
  other: <><circle cx="12" cy="12" r="8"></circle><path d="M12 9v3l2 2"></path></>,
};

function CheckBadge() {
  return (
    <span className="quote-check">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5"></path>
      </svg>
    </span>
  );
}

const Quote: NextPageWithTitle = () => {
  const { whatsappLink, addressLine, addressDetail } = useSettings();
  const [dev, setDev] = useState<string | null>(null);
  const [issue, setIssue] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);

  const selectedDevice = DEVICES.find((d) => d.id === dev);
  const selectedIssue = ISSUES.find((i) => i.id === issue);
  const ready = !!selectedDevice && !!selectedIssue;

  let estimate = "—";
  let estimateLabel = "Pick a device and a fault to see your range";
  if (selectedDevice && selectedIssue) {
    const low = round100(selectedIssue.base * selectedDevice.mult);
    estimate = `KSh ${money(low)} – ${money(round100(low * 1.45))}`;
    estimateLabel = `${selectedIssue.label} · ${selectedDevice.label}`;
  }

  const book = async () => {
    const b: Booking = {
      name: nameRef.current?.value || "Walk-in",
      phone: phoneRef.current?.value || "",
      model: modelRef.current?.value || "device",
      date: dateRef.current?.value || "the next open slot",
      time: timeRef.current?.value || "",
      details,
    };
    setSaving(true);
    setSaveError(false);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: b.name,
          phone: b.phone,
          model: b.model,
          issue: selectedIssue ? selectedIssue.label : null,
          details: b.details,
          date: b.date,
          time: b.time,
        }),
      });
      if (!res.ok) throw new Error("save failed");
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }

    setBooking(b);
    setBooked(true);
  };

  const bookingSummary = booking
    ? `${booking.name}, we have your ${booking.model} down for ${booking.date} at ${booking.time}. ${addressDetail}, ${addressLine}. Confirm on WhatsApp and we will hold the slot.`
    : "";
  const bookingWaLink = booking
    ? whatsappLink(
        `Hi BEAPS, I booked a repair.\nName: ${booking.name}\nPhone: ${booking.phone}\nDevice: ${booking.model}\nFault: ${selectedIssue ? selectedIssue.label : "to be diagnosed"}${booking.details ? `\nDetails: ${booking.details}` : ""}\nSlot: ${booking.date} ${booking.time}`
      )
    : "";

  const sendToWhatsApp = whatsappLink(
    ready
      ? `Hi BEAPS, I'd like a repair quote.\nDevice: ${selectedDevice!.label}\nFault: ${selectedIssue!.label}\nEstimate shown: ${estimate}${details ? `\nWhat's wrong: ${details}` : ""}\n\nCan you confirm this for my exact model?`
      : `Hi BEAPS, I'd like a repair quote.${details ? `\nWhat's wrong: ${details}` : ""}`
  );

  return (
    <div data-screen-label="Instant quote" style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 72px" }}>
      <div className="animate-fade-up page-hero">
        <img src="/quote-hero.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,6,6,0.35), rgba(6,6,6,0.9))", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em", color: "#ffffff" }}>Instant quote</h1>
          <p style={{ margin: "14px 0 0", fontSize: 17, color: "rgba(255,255,255,0.8)", maxWidth: 520 }}>Pick your device and fault for a price range, then send it straight to our WhatsApp — no forms, no waiting.</p>
        </div>
      </div>

      <Reveal>
      <div className="quote-card" style={{ marginTop: 32 }}>
        <div className="quote-step-label">
          <span className="quote-step-num">1</span>
          Your device
        </div>
        <div style={{ display: "grid", gridTemplateColumns: autoFit(150), gap: 10, marginTop: 14 }}>
          {DEVICES.map((d) => (
            <div
              key={d.id}
              onClick={() => setDev(d.id)}
              className="quote-option"
              style={chipStyle(dev === d.id)}
            >
              {dev === d.id && <CheckBadge />}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {DEVICE_ICONS[d.id]}
              </svg>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 10 }}>{d.label}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 3 }}>{d.ex}</div>
            </div>
          ))}
        </div>
      </div>
      </Reveal>

      <Reveal delay={0.05}>
      <div className="quote-card" style={{ marginTop: 14 }}>
        <div className="quote-step-label">
          <span className="quote-step-num">2</span>
          What's wrong
        </div>
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginTop: 14 }}>
          {ISSUES.map((i) => (
            <button key={i.id} type="button" className="chip" style={chipStyle(issue === i.id)} onClick={() => setIssue(i.id)}>
              {i.label}
            </button>
          ))}
        </div>

        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Add detail if you like — e.g. screen has a black line since I dropped it yesterday (optional)"
          className="text-field"
          rows={3}
          style={{ height: "auto", minHeight: 76, marginTop: 16, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5, padding: "12px 14px" }}
        />
      </div>
      </Reveal>

      <Reveal delay={0.1}>
      <div className="quote-estimate">
        <div className="quote-step-label" style={{ color: "rgba(255,255,255,0.6)", justifyContent: "center" }}>
          <span className="quote-step-num">3</span>
          Send it
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 14 }}>{estimateLabel}</div>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 38, fontWeight: 600, letterSpacing: "-0.03em", marginTop: 6, color: "#ffffff" }}>{estimate}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>Confirmed after a free diagnostic. Parts carry a 90-day warranty.</div>
        <a href={sendToWhatsApp} target="_blank" rel="noreferrer" className="btn-solid md quote-send-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          {ready ? "Send my quote on WhatsApp" : "Send my issue on WhatsApp"}
        </a>
        {!ready && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 10 }}>Tip: pick a device and a fault above for an exact price range first.</div>}
      </div>
      </Reveal>

      <Reveal delay={0.15}>
      <div style={{ marginTop: 22, textAlign: "center" }}>
        <button type="button" onClick={() => setShowBooking((v) => !v)} style={{ fontSize: 14, color: "var(--text-tertiary)", background: "none", border: "none", cursor: "pointer" }}>
          {showBooking ? "Hide" : "Prefer a fixed appointment instead?"} <span style={{ color: "var(--orange-400)" }}>{showBooking ? "" : "Book a slot →"}</span>
        </button>
      </div>
      </Reveal>

      {showBooking && (
      <Reveal>
      <div className="quote-card" style={{ marginTop: 14 }}>
        <div className="quote-step-label">Book a fixed slot</div>

        {!booked && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: autoFit(240), gap: 14, marginTop: 16 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "var(--text-secondary)" }}>
                Your name
                <input ref={nameRef} type="text" placeholder="Bernard M." className="text-field" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "var(--text-secondary)" }}>
                Phone / WhatsApp
                <input ref={phoneRef} type="tel" placeholder="07xx xxx xxx" className="text-field" style={{ fontFamily: "'Geist Mono', monospace" }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "var(--text-secondary)" }}>
                Model
                <input ref={modelRef} type="text" placeholder="e.g. Redmi Note 12" className="text-field" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "var(--text-secondary)" }}>
                Drop-off
                <div style={{ display: "flex", gap: 10 }}>
                  <input ref={dateRef} type="date" className="text-field" style={{ flex: 1, fontFamily: "'Geist Mono', monospace" }} />
                  <select ref={timeRef} className="text-field" style={{ width: 130 }}>
                    <option>08:30</option>
                    <option>10:00</option>
                    <option>11:30</option>
                    <option>13:00</option>
                    <option>14:30</option>
                    <option>16:00</option>
                    <option>17:30</option>
                  </select>
                </div>
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20, flexWrap: "wrap" }}>
              <button type="button" className="btn-solid md" onClick={book} disabled={saving}>{saving ? "Booking…" : "Book this slot"}</button>
              <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Or just walk in — no appointment needed.</span>
            </div>
            {saveError && (
              <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--red-400, #e05d5d)" }}>
                We couldn't save this to our system, but your slot request below still works — confirm it on WhatsApp.
              </p>
            )}
          </>
        )}

        {booked && (
          <div style={{ marginTop: 16, padding: 22, borderRadius: 18, border: "1px solid var(--orange-a20)", background: "var(--brand-tint)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-400)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>Slot requested</span>
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.55 }}>{bookingSummary}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              <a href={bookingWaLink} target="_blank" rel="noreferrer" className="btn-solid sm">Confirm on WhatsApp</a>
              <button type="button" className="btn-outline sm" onClick={() => { setBooked(false); setBooking(null); }}>Book another</button>
            </div>
          </div>
        )}
      </div>
      </Reveal>
      )}
    </div>
  );
};

Quote.pageTitle = "Instant quote — BEAPS Mobile Fix";

export default Quote;
