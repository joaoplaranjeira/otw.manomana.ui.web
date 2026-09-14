"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";
import { PageContainer } from "@/components/ui/PageContainer";
import { PredictionStats } from "@/components/prediction/PredictionStats";
import { Reveal } from "@/components/result/Reveal";
import { eventApi } from "@/lib/api/eventApi";
import { predictionApi } from "@/lib/api/predictionApi";
import type { EventData, PredictionStats as Stats } from "@/lib/types";

export default function ResultsPage() {
  const [event, setEvent] = useState<EventData>();
  const [stats, setStats] = useState<Stats>();
  const [error, setError] = useState("");
  useEffect(() => { Promise.all([eventApi.get(), predictionApi.stats()]).then(([eventData, statsData]) => { setEvent(eventData); setStats(statsData); }).catch((err) => setError(err.message)); }, []);
  return <PageContainer>
    {!event && !error && <Loading />}
    {error && <div className="empty"><h1>Não conseguimos contar os palpites.</h1><p>{error}</p></div>}
    {event?.status === "Published" && event.birth && <Reveal birth={event.birth} />}
    {event && event.status !== "Published" && stats && <section className="results page-enter"><p className="eyebrow">{event.status === "Open" ? "Até agora..." : "As apostas fecharam."}</p><h1>{event.status === "Open" ? "A família está dividida." : "Agora é esperar."}</h1><p className="results__intro">{event.status === "Open" ? "Cada pessoa tem uma teoria. O Dino, esse, continua sem dizer nada." : "Já não vale mudar de ideias. O segredo continua bem guardado."}</p><PredictionStats stats={stats} closed={event.status !== "Open"} />{event.status === "Open" && <Button href="/apostar">Fazer o meu palpite</Button>}</section>}
  </PageContainer>;
}
