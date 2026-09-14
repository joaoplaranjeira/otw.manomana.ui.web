export function DinoIcon({ compact = false }: { compact?: boolean }) {
  return (
    <svg className={`dino-egg ${compact ? "dino-egg--compact" : ""}`} viewBox="0 0 220 260" role="img" aria-label="Um ovo de dinossauro desenhado a linha">
      <ellipse className="dino-egg__shadow" cx="110" cy="244" rx="60" ry="7" />
      <path className="dino-egg__shell" d="M111 13C64 13 29 91 25 158c-3 54 28 84 83 87 55 2 89-26 87-81-2-68-37-151-84-151Z" />
      <path className="dino-egg__crack" d="m42 139 29 14 23-29 28 28 22-25 34 15" />
    </svg>
  );
}
