import type { PredictionStats as Stats } from "@/lib/types";
import { formatDate, formatHeight, formatWeight, genderLabel } from "@/lib/utils/format";

export function PredictionStats({ stats, closed = false }: { stats: Stats; closed?: boolean }) {
  return (
    <section className="stats" aria-label="Distribuição dos palpites">
      <div className="stats__labels"><span>MANO <strong>{stats.boyPercentage}%</strong></span><span>MANA <strong>{stats.girlPercentage}%</strong></span></div>
      <div className="stats__bar"><span style={{ width: `${stats.boyPercentage}%` }} /></div>
      <p className="stats__total">{stats.total} {stats.total === 1 ? "palpite" : "palpites"}{closed ? " registados" : " até agora"}</p>
      <div className="stats__averages">
        <div><span>Data média prevista</span><strong>{formatDate(stats.averageBirthDate)}</strong></div>
        <div><span>Peso médio previsto</span><strong>{formatWeight(stats.averageWeightGrams)}</strong></div>
        <div><span>Altura média prevista</span><strong>{formatHeight(stats.averageHeightCentimeters)}</strong></div>
      </div>
      {!!stats.recentParticipants?.length && !closed && <div className="recent"><p>Últimos a arriscar</p>{stats.recentParticipants.map((item, index) => <div key={`${item.name}-${index}`}><span>{item.name}</span><span>{genderLabel(item.gender).toLowerCase()}</span></div>)}</div>}
    </section>
  );
}
