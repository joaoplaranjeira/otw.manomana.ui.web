export function Loading({ label = "A preparar tudo..." }: { label?: string }) {
  return <div className="loading"><span className="loading__dot" /><p>{label}</p></div>;
}
