interface WordRevealProps {
  text: string;
  startDelay?: number;
  step?: number;
}

export default function WordReveal({ text, startDelay = 0.3, step = 0.1 }: WordRevealProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <span
            style={{
              display: "inline-block",
              animation: "wordReveal 0.7s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: `${startDelay + i * step}s`,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </>
  );
}
