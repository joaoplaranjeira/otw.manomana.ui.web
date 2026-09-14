import type { PredictionRequest } from "@/lib/types";
import { formatDate, formatHeight, genderLabel } from "@/lib/utils/format";

export function PredictionSummary({ value }: { value: PredictionRequest }) {
  return (
    <div className="summary">
      <p className="summary__name">{value.name}</p>
      <p className="summary__gender">{genderLabel(value.gender)}</p>
      <dl>
        <div><dt>Data</dt><dd>{formatDate(value.predictedBirthDate)}</dd></div>
        <div><dt>Hora</dt><dd>{value.predictedBirthTime || "—"}</dd></div>
        <div><dt>Peso</dt><dd>{value.predictedWeightGrams ? `${value.predictedWeightGrams} g` : "—"}</dd></div>
        <div><dt>Altura</dt><dd>{formatHeight(value.predictedHeightCentimeters)}</dd></div>
      </dl>
    </div>
  );
}
