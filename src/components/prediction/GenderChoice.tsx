import type { GenderPrediction } from "@/lib/types";

export function GenderChoice({ value, onChange }: { value?: GenderPrediction; onChange: (value: GenderPrediction) => void }) {
  return (
    <div className="gender-choice" role="radiogroup" aria-label="Palpite">
      {(["Boy", "Girl"] as const).map((gender) => (
        <button key={gender} type="button" role="radio" aria-checked={value === gender} className={value === gender ? "is-selected" : ""} onClick={() => onChange(gender)}>
          {gender === "Boy" ? "MANO" : "MANA"}<span>{gender === "Boy" ? "Acho que vem aí um mano" : "Acho que vem aí uma mana"}</span>
        </button>
      ))}
    </div>
  );
}
