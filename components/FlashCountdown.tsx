import { useEffect, useState } from "react";

interface FlashCountdownProps {
  target: string;
}

function timeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: diff <= 0 };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flash-countdown-unit">
      <span className="flash-countdown-value">{String(value).padStart(2, "0")}</span>
      <span className="flash-countdown-label">{label}</span>
    </div>
  );
}

export default function FlashCountdown({ target }: FlashCountdownProps) {
  const [time, setTime] = useState<ReturnType<typeof timeLeft> | null>(null);

  useEffect(() => {
    setTime(timeLeft(target));
    const id = setInterval(() => setTime(timeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!time) {
    return <div style={{ display: "flex", gap: 10, visibility: "hidden" }}><Unit value={0} label="days" /><Unit value={0} label="hrs" /><Unit value={0} label="min" /><Unit value={0} label="sec" /></div>;
  }

  if (time.done) {
    return <span style={{ fontSize: 13.5, fontWeight: 500 }}>Any moment now</span>;
  }

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Unit value={time.days} label="days" />
      <Unit value={time.hours} label="hrs" />
      <Unit value={time.minutes} label="min" />
      <Unit value={time.seconds} label="sec" />
    </div>
  );
}
