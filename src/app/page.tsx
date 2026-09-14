"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DinoIcon } from "@/components/ui/DinoIcon";
import { Loading } from "@/components/ui/Loading";
import { PageContainer } from "@/components/ui/PageContainer";
import { Reveal } from "@/components/result/Reveal";
import { eventApi } from "@/lib/api/eventApi";
import type { EventData } from "@/lib/types";

export default function HomePage() {
  const [event, setEvent] = useState<EventData>();
  const [error, setError] = useState("");

  useEffect(() => { eventApi.get().then(setEvent).catch((err) => setError(err.message)); }, []);

  return (
    <PageContainer>
      {!event && !error && <Loading />}
      {error && <div className="empty"><p className="eyebrow">Algo não correu bem.</p><h1>O Dino está escondido.</h1><p>{error}</p></div>}
      {event?.status === "Published" && event.birth && <Reveal birth={event.birth} />}
      {event && event.status !== "Published" && (
        <section className="hero page-enter">
          <div className="hero__copy">
            <p className="eyebrow">O Dino está quase a chegar.</p>
            <h1 aria-label="Será mano ou será mana?"><span>Será mano</span><span>ou será mana?</span></h1>
            <p className="hero__lead">A Maria Francisca ainda não sabe se vai ganhar um mano ou uma mana. E tu, arriscas?</p>
            {event.status === "Open" ? <div className="actions"><Button href="/apostar">Fazer o meu palpite</Button><Button href="/resultado" variant="secondary">Ver as apostas</Button></div> : <div className="closed-callout"><strong>As apostas fecharam.</strong><span>Agora já não vale mudar de ideias.</span><Button href="/resultado" variant="secondary">Aguardar pelo Dino</Button></div>}
          </div>
          <div className="hero__art"><DinoIcon /><p>Há uma surpresa a crescer aqui dentro.</p></div>
        </section>
      )}
    </PageContainer>
  );
}
