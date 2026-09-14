import type { RankingEntry } from "@/lib/types";

export function RankingRow({ entry }: { entry: RankingEntry }) {
  return (
    <details className="ranking-row">
      <summary><span className="ranking-row__position">{entry.position}</span><strong>{entry.name}</strong><span>{entry.points} pts</span></summary>
      <dl>
        <div><dt>Sexo</dt><dd>{entry.genderCorrect ? "certo" : "errado"}</dd></div>
        <div><dt>Data</dt><dd>{entry.dateDifferenceDays === undefined ? "—" : entry.dateDifferenceDays === 0 ? "certa" : `${entry.dateDifferenceDays} dia${entry.dateDifferenceDays === 1 ? "" : "s"}`}</dd></div>
        <div><dt>Hora</dt><dd>{entry.timeDifferenceMinutes === undefined ? "—" : `${entry.timeDifferenceMinutes} min`}</dd></div>
        <div><dt>Peso</dt><dd>{entry.weightDifferenceGrams === undefined ? "—" : `${entry.weightDifferenceGrams > 0 ? "+" : ""}${entry.weightDifferenceGrams} g`}</dd></div>
        <div><dt>Altura</dt><dd>{entry.heightDifferenceCentimeters === undefined ? "—" : `${entry.heightDifferenceCentimeters > 0 ? "+" : ""}${entry.heightDifferenceCentimeters} cm`}</dd></div>
      </dl>
    </details>
  );
}
