interface WordRevealProps {
  text: string;
  startDelay?: number;
  step?: number;
  accentWords?: string[];
}

const accentStyle = {
  color: "var(--orange-400)",
  textShadow: "0 0 24px rgba(31, 161, 58, 0.65)",
};

export default function WordReveal({ text, startDelay = 0.3, step = 0.1, accentWords = [] }: WordRevealProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const isAccent = accentWords.some((a) => word.toLowerCase().startsWith(a.toLowerCase()));
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <span
              style={{
                display: "inline-block",
                animation: "wordReveal 0.7s cubic-bezier(0.16,1,0.3,1) both",
                animationDelay: `${startDelay + i * step}s`,
                ...(isAccent ? accentStyle : null),
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        );
      })}
    </>
  );
}
