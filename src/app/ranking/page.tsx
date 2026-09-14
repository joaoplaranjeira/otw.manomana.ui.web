"use client";

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { Loading } from "@/components/ui/Loading";
import { RankingRow } from "@/components/result/RankingRow";
import { eventApi } from "@/lib/api/eventApi";
import { rankingApi } from "@/lib/api/rankingApi";
import type { EventData, RankingEntry } from "@/lib/types";

export default function RankingPage() {
  const [event, setEvent] = useState<EventData>();
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    eventApi.get()
      .then(async (eventData) => {
        setEvent(eventData);
        if (eventData.status === "Published") setRanking(await rankingApi.list());
      })
      .catch(() => setEvent({ status: "Open" }))
      .finally(() => setLoading(false));
  }, []);
  return <PageContainer>{loading ? <Loading /> : event?.status !== "Published" ? <section className="empty page-enter"><p className="eyebrow">Ainda é cedo.</p><h1>O ranking continua em segredo.</h1><p>Quando o Dino chegar, descobrimos quem o conhecia melhor.</p></section> : <section className="ranking page-enter"><p className="eyebrow">Palpites finais</p><h1>Quem conhece<br />melhor o Dino?</h1><p>Abre cada resultado para descobrir quão perto ficou.</p><div className="ranking__list">{ranking.map((entry) => <RankingRow key={entry.id} entry={entry} />)}</div></section>}</PageContainer>;
}
