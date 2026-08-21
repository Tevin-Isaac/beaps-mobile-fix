import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import type { NextPageWithTitle } from "../lib/types";
import Reveal from "../components/Reveal";

interface BookingRow {
  id: string;
  name: string;
  model: string;
  issue: string | null;
  details: string | null;
  date: string;
  time: string;
  status: string;
  createdAt: string;
}

const Dashboard: NextPageWithTitle = () => {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<BookingRow[] | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []));
  }, [status]);

  return (
    <div data-screen-label="Your dashboard" style={{ maxWidth: 800, margin: "0 auto", padding: "56px 20px 72px" }}>
      <h1 className="animate-fade-up" style={{ margin: 0, fontSize: "clamp(28px, 4.2vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em" }}>Your repairs</h1>
      <p className="animate-fade-up delay-200" style={{ margin: "14px 0 0", fontSize: 16, color: "var(--text-secondary)" }}>
        Sign in with the same email you used on the instant quote page to see what you've booked.
      </p>

      {status === "loading" && <p style={{ marginTop: 24, color: "var(--text-secondary)" }}>Loading…</p>}

      {status === "unauthenticated" && (
        <Reveal>
        <div style={{ marginTop: 28, padding: 26, border: "1px solid var(--border-subtle)", borderRadius: 20, background: "var(--surface-card)" }}>
          <button type="button" className="btn-solid md" onClick={() => signIn("google")}>Sign in with Google</button>
        </div>
        </Reveal>
      )}

      {status === "authenticated" && (
        <Reveal>
        <div style={{ marginTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>Signed in as {session?.user?.email}</span>
            <button type="button" className="btn-outline sm" onClick={() => signOut()}>Sign out</button>
          </div>

          {bookings === null && <p style={{ marginTop: 20, color: "var(--text-secondary)" }}>Loading your bookings…</p>}

          {bookings !== null && bookings.length === 0 && (
            <p style={{ marginTop: 20, color: "var(--text-secondary)" }}>
              No bookings yet under this email. Head to the <a href="/quote" style={{ color: "var(--orange-400)" }}>instant quote</a> page to request a repair slot.
            </p>
          )}

          {bookings !== null && bookings.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
              {bookings.map((b) => (
                <div key={b.id} style={{ padding: 18, border: "1px solid var(--border-subtle)", borderRadius: 16, background: "var(--surface-card)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>{b.model}</h3>
                    <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, background: "var(--brand-tint)", color: "var(--orange-400)" }}>{b.status}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6 }}>{b.issue || "Not specified"}{b.details ? ` — ${b.details}` : ""}</div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12.5, color: "var(--text-tertiary)", marginTop: 10 }}>{b.date} at {b.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        </Reveal>
      )}
    </div>
  );
};

Dashboard.pageTitle = "Your dashboard — BEAPS Mobile Fix";

export default Dashboard;
