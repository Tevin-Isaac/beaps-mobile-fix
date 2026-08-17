import { useRef, useState } from "react";
import { DEVICES, ISSUES, chipStyle, money, round100, whatsappLink } from "../lib/data";
import { autoFit } from "../lib/style";
import type { NextPageWithTitle, Booking } from "../lib/types";
import Reveal from "../components/Reveal";

const Quote: NextPageWithTitle = () => {
  const [dev, setDev] = useState<string | null>(null);
  const [issue, setIssue] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);

  const selectedDevice = DEVICES.find((d) => d.id === dev);
  const selectedIssue = ISSUES.find((i) => i.id === issue);

  let estimate = "—";
  let estimateLabel = "Pick a device and a fault to see your range";
  if (selectedDevice && selectedIssue) {
    const low = round100(selectedIssue.base * selectedDevice.mult);
    estimate = `KSh ${money(low)} – ${money(round100(low * 1.45))}`;
    estimateLabel = `${selectedIssue.label} · ${selectedDevice.label}`;
  }

  const book = () => {
    const b: Booking = {
      name: nameRef.current?.value || "Walk-in",
      phone: phoneRef.current?.value || "",
      model: modelRef.current?.value || "device",
      date: dateRef.current?.value || "the next open slot",
      time: timeRef.current?.value || "",
    };
    setBooking(b);
    setBooked(true);
  };

  const bookingSummary = booking
    ? `${booking.name}, we have your ${booking.model} down for ${booking.date} at ${booking.time}. Room 420, 4th floor, Old Mutual Building. Confirm on WhatsApp and we will hold the slot.`
    : "";
  const bookingWaLink = booking
    ? whatsappLink(
        `Hi BEAPS, I booked a repair.\nName: ${booking.name}\nPhone: ${booking.phone}\nDevice: ${booking.model}\nFault: ${selectedIssue ? selectedIssue.label : "to be diagnosed"}\nSlot: ${booking.date} ${booking.time}`
      )
    : "";

  return (
    <div data-screen-label="Instant quote" style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 className="animate-fade-up" style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.032em" }}>Instant quote</h1>
      <p className="animate-fade-up delay-200" style={{ margin: "14px 0 0", fontSize: 17, color: "var(--text-secondary)" }}>Two taps for an estimate range, then book a time if it works for you.</p>

      <Reveal>
      <div style={{ marginTop: 32, padding: 26, border: "1px solid var(--border-subtle)", borderRadius: 24, background: "var(--surface-card)" }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Step 01 — your device</div>
        <div style={{ display: "grid", gridTemplateColumns: autoFit(200), gap: 12, marginTop: 14 }}>
          {DEVICES.map((d) => (
            <div key={d.id} onClick={() => setDev(d.id)} style={{ padding: 16, borderRadius: 14, border: "1px solid", cursor: "pointer", ...chipStyle(dev === d.id) }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{d.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 5 }}>{d.ex}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)", marginTop: 28 }}>Step 02 — the fault</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          {ISSUES.map((i) => (
            <button key={i.id} type="button" className="chip" style={chipStyle(issue === i.id)} onClick={() => setIssue(i.id)}>
              {i.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 28, padding: 22, borderRadius: 18, border: "1px solid var(--orange-a20)", background: "linear-gradient(120deg, rgba(31,161,58,0.14), rgba(10,10,10,0.6))" }}>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{estimateLabel}</div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", marginTop: 6 }}>{estimate}</div>
          <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 8 }}>Confirmed after a free diagnostic. Parts carry a 90-day warranty.</div>
        </div>
      </div>
      </Reveal>

      <Reveal delay={0.1}>
      <div style={{ marginTop: 20, padding: 26, border: "1px solid var(--border-subtle)", borderRadius: 24, background: "var(--surface-card)" }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Step 03 — book a time</div>

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
              <button type="button" className="btn-solid md" onClick={book}>Book this slot</button>
              <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Or just walk in — no appointment needed.</span>
            </div>
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
    </div>
  );
};

Quote.pageTitle = "Instant quote — BEAPS Mobile Fix";

export default Quote;
