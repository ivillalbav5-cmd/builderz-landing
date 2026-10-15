// Texto que entra palabra por palabra con desenfoque (inspirado en React Bits BlurText).
// Server component, 0 JS. Las palabras quedan como texto real (SEO y lectores de pantalla).
type Props = { text: string; start?: number; step?: number };

export function BlurWords({ text, start = 0, step = 0.08 }: Props) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <span key={i}>
      <span className="inline-block animate-blur-in" style={{ animationDelay: `${start + i * step}s` }}>
        {word}
      </span>
      {i < words.length - 1 && " "}
    </span>
  ));
}
