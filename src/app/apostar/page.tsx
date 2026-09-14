"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { DinoIcon } from "@/components/ui/DinoIcon";
import { GenderChoice } from "@/components/prediction/GenderChoice";
import { NumberStepper, TextInput } from "@/components/ui/Inputs";
import { Logo } from "@/components/ui/Logo";
import { PredictionSummary } from "@/components/prediction/PredictionSummary";
import { eventApi } from "@/lib/api/eventApi";
import { predictionApi } from "@/lib/api/predictionApi";
import type { GenderPrediction, PredictionRequest } from "@/lib/types";
import { displayDateToIso, isValidTimeInput, maskDateInput, maskTimeInput } from "@/lib/utils/format";

const steps = ["nome", "género", "data", "hora", "peso", "altura", "confirmar"];

export default function PredictionPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<GenderPrediction>();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const parsedDate = displayDateToIso(date);

  useEffect(() => { eventApi.get().then((event) => { if (event.status !== "Open") router.replace("/resultado"); }).catch((err) => setError(err.message)); }, [router]);
  const value = useMemo<PredictionRequest | undefined>(() => gender ? {
    name: name.trim(), gender,
    ...(parsedDate && { predictedBirthDate: parsedDate }), ...(isValidTimeInput(time) && { predictedBirthTime: time }),
    ...(weight && { predictedWeightGrams: Number(weight) }),
    ...(height && { predictedHeightCentimeters: Number(height) }),
  } : undefined, [name, gender, parsedDate, time, weight, height]);

  const next = () => { setError(""); setStep((current) => Math.min(current + 1, steps.length - 1)); };
  const submit = async () => {
    if (!value) return;
    setSubmitting(true); setError("");
    try { await predictionApi.create(value); setSuccess(true); }
    catch (err) { setError(err instanceof Error ? err.message : "Não foi possível guardar o palpite."); }
    finally { setSubmitting(false); }
  };

  if (success) return (
    <main className="flow-shell success page-enter"><Logo /><DinoIcon compact /><p className="eyebrow">Está feito.</p><h1>Palpite registado.</h1><p>Agora só falta o Dino decidir quando quer aparecer.</p><Button href="/resultado">Ver como estão as apostas</Button></main>
  );

  return (
    <main className="flow-shell">
      <header className="flow-header"><Logo /><button type="button" onClick={() => step ? setStep(step - 1) : router.push("/")} aria-label="Voltar">←</button></header>
      <div className="progress" aria-label={`Passo ${step + 1} de ${steps.length}`}><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
      <form className="flow-card page-enter" key={step} onSubmit={(event) => { event.preventDefault(); if (step === 6) submit(); else next(); }}>
        <p className="step-label">{String(step + 1).padStart(2, "0")} — {steps[step]}</p>
        {step === 0 && <><h1>Primeiro:<br />quem és?</h1><TextInput autoFocus label="Nome" name="name" placeholder="O teu nome" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required /></>}
        {step === 1 && <><h1>Então... qual é<br />o teu palpite?</h1><GenderChoice value={gender} onChange={setGender} /></>}
        {step === 2 && <><h1>Quando achas que<br />o Dino vai chegar?</h1><TextInput autoFocus label="Data prevista" name="date" type="text" inputMode="numeric" autoComplete="off" placeholder="dd/mm/yyyy" maxLength={10} pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" value={date} onChange={(e) => setDate(maskDateInput(e.target.value))} /></>}
        {step === 3 && <><h1>E a que horas?</h1><TextInput autoFocus label="Hora prevista" name="time" type="text" inputMode="numeric" autoComplete="off" placeholder="HH:mm" maxLength={5} pattern="([01][0-9]|2[0-3]):[0-5][0-9]" value={time} onChange={(e) => setTime(maskTimeInput(e.target.value))} /></>}
        {step === 4 && <><h1>Quanto vai pesar?</h1><TextInput autoFocus label="Peso previsto" name="weight" type="number" inputMode="numeric" min="1000" max="6000" step="1" placeholder="3250" suffix="g" value={weight} onChange={(e) => setWeight(e.target.value)} /></>}
        {step === 5 && <><h1>E quanto vai<br />medir?</h1><NumberStepper autoFocus label="Altura prevista" name="height" min={30} max={70} placeholder={50} suffix="cm" value={height} onChange={setHeight} /></>}
        {step === 6 && value && <><h1>É este o teu<br />palpite final?</h1><PredictionSummary value={value} /></>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="flow-actions">
          <Button type="submit" full disabled={(step === 0 && !name.trim()) || (step === 1 && !gender) || (step === 2 && !!date && !parsedDate) || (step === 3 && !!time && !isValidTimeInput(time)) || submitting}>{step === 6 ? (submitting ? "A registar..." : "Confirmar palpite") : "Continuar"}</Button>
          {step >= 2 && step <= 5 && <button className="skip" type="button" onClick={next}>Prefiro não adivinhar</button>}
          {step === 6 && <button className="skip" type="button" onClick={() => setStep(0)}>Alterar</button>}
        </div>
      </form>
    </main>
  );
}
