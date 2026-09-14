import type { BirthResult } from "@/lib/types";
import { formatDate, formatHeight, formatWeight, genderLabel } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";

export function Reveal({ birth }: { birth: BirthResult }) {
  return (
    <section className="reveal page-enter">
      <p className="eyebrow">O Dino chegou.</p>
      <h1>É...</h1>
      <p className="reveal__gender">{genderLabel(birth.gender)}</p>
      <p className="reveal__name">Olá, {birth.name}.</p>
      {birth.photoUrl && <img className="reveal__photo" src={birth.photoUrl} alt={`O bebé ${birth.name}`} />}
      <div className="reveal__facts"><span>{formatDate(birth.birthDate, true)}</span><span>{birth.birthTime}</span><span>{formatWeight(birth.weightGrams)}</span><span>{formatHeight(birth.heightCentimeters)}</span></div>
      <Button href="/ranking">Ver o ranking</Button>
    </section>
  );
}
