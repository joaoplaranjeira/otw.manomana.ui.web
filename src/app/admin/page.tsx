"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { NumberStepper, TextInput } from "@/components/ui/Inputs";
import { Logo } from "@/components/ui/Logo";
import { adminApi } from "@/lib/api/adminApi";
import { eventApi } from "@/lib/api/eventApi";
import type { BirthResult, EventData, GenderPrediction, Prediction } from "@/lib/types";
import { genderLabel } from "@/lib/utils/format";
import { displayDateToIso, isValidTimeInput, isoDateToDisplay, maskDateInput, maskTimeInput } from "@/lib/utils/format";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [event, setEvent] = useState<EventData>({ status: "Open" });
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showBirth, setShowBirth] = useState(false);
  const [birth, setBirth] = useState<BirthResult>({ gender: "Boy", birthDate: "", birthTime: "", weightGrams: 0, heightCentimeters: 0, name: "" });

  const refresh = async (sessionToken: string) => {
    const [eventData, predictionData] = await Promise.all([eventApi.get(), adminApi.predictions(sessionToken)]);
    setEvent(eventData); setPredictions(predictionData);
    if (eventData.birth) setBirth({ ...eventData.birth, birthDate: isoDateToDisplay(eventData.birth.birthDate) });
  };
  useEffect(() => { const saved = sessionStorage.getItem("manomana.admin"); if (saved) { setToken(saved); refresh(saved).catch(() => sessionStorage.removeItem("manomana.admin")); } }, []);
  const counts = useMemo(() => ({ boy: predictions.filter((item) => item.gender === "Boy").length, girl: predictions.filter((item) => item.gender === "Girl").length }), [predictions]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setSaving(true);
    try { const session = await adminApi.login(username, password); setToken(session.token); sessionStorage.setItem("manomana.admin", session.token); await refresh(session.token); }
    catch (err) { setError(err instanceof Error ? err.message : "Não foi possível entrar."); }
    finally { setSaving(false); }
  };
  const updateOpen = async (open: boolean) => { if (!confirm(open ? "Reabrir as apostas?" : "Fechar as apostas?")) return; setEvent(await adminApi.setOpen(open, token)); };
  const saveBirth = async (e: React.FormEvent) => { e.preventDefault(); const birthDate = displayDateToIso(birth.birthDate); if (!birthDate) { setError("Indica uma data válida no formato dd/mm/yyyy."); return; } if (!isValidTimeInput(birth.birthTime)) { setError("Indica uma hora válida no formato 24 horas (HH:mm)."); return; } if (!confirm("Guardar estes dados? Continuarão secretos até publicar o reveal.")) return; setSaving(true); setError(""); try { setEvent(await adminApi.saveBirth({ ...birth, birthDate }, token)); setShowBirth(false); } finally { setSaving(false); } };
  const publish = async () => { if (!confirm("Publicar o reveal agora? Este resultado ficará visível para todos.")) return; setEvent(await adminApi.publish(token)); };
  const resetAll = async () => {
    if (!confirm("Fazer reset a tudo? Todos os palpites e dados do nascimento serão apagados. Esta ação não pode ser anulada.")) return;
    setResetting(true); setActionError("");
    try {
      await adminApi.reset(token);
      await refresh(token);
      setBirth({ gender: "Boy", birthDate: "", birthTime: "", weightGrams: 0, heightCentimeters: 0, name: "" });
      setShowBirth(false);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Não foi possível fazer o reset.");
    } finally {
      setResetting(false);
    }
  };
  const remove = async (id: string, name: string) => { if (!confirm(`Remover o palpite de ${name}?`)) return; await adminApi.removePrediction(id, token); setPredictions((items) => items.filter((item) => item.id !== id)); };
  const exportCsv = () => {
    const quote = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const rows = [["Nome", "Palpite", "Data", "Hora", "Peso", "Altura"], ...predictions.map((p) => [p.name, genderLabel(p.gender), p.predictedBirthDate, p.predictedBirthTime, p.predictedWeightGrams, p.predictedHeightCentimeters])];
    const blob = new Blob([rows.map((row) => row.map(quote).join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const anchor = document.createElement("a"); anchor.href = URL.createObjectURL(blob); anchor.download = "palpites-mano-mana.csv"; anchor.click(); URL.revokeObjectURL(anchor.href);
  };

  if (!token) return <main className="admin-login"><Logo /><form onSubmit={login}><p className="eyebrow">Área reservada</p><h1>Olá.</h1><p>Entra para gerir as apostas e, quando chegar a hora, apresentar o Dino.</p><TextInput label="Utilizador" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username" /><TextInput label="Palavra-passe" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" autoComplete="current-password" />{process.env.NEXT_PUBLIC_API_MODE !== "remote" && <p className="mock-hint">Demo: admin / dino</p>}{error && <p className="form-error">{error}</p>}<Button type="submit" full disabled={saving}>{saving ? "A entrar..." : "Entrar"}</Button></form></main>;

  return <main className="admin-shell">
    <header className="admin-header"><Logo /><div><span className={`status status--${event.status.toLowerCase()}`}>{event.status}</span><button onClick={() => { sessionStorage.removeItem("manomana.admin"); setToken(""); }}>Sair</button></div></header>
    <section className="admin-title"><p className="eyebrow">Painel de controlo</p><h1>O Dino, por dentro.</h1></section>
    <section className="metric-grid"><article><span>Total de palpites</span><strong>{predictions.length}</strong></article><article><span>Mano</span><strong>{counts.boy}</strong></article><article><span>Mana</span><strong>{counts.girl}</strong></article></section>
    <section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Evento</p><h2>Estado e reveal</h2></div></div><div className="admin-actions">{event.status === "Open" ? <Button onClick={() => updateOpen(false)} variant="secondary">Fechar apostas</Button> : event.status === "Closed" ? <Button onClick={() => updateOpen(true)} variant="secondary">Reabrir apostas</Button> : null}<Button onClick={() => setShowBirth(!showBirth)} variant="secondary">{event.birth ? "Editar nascimento" : "Introduzir nascimento"}</Button>{event.status === "Born" && <Button onClick={publish}>Publicar reveal</Button>}<Button onClick={resetAll} variant="danger" disabled={resetting}>{resetting ? "A fazer reset..." : "Fazer reset a tudo"}</Button></div>{actionError && <p className="form-error" role="alert">{actionError}</p>}
      {showBirth && <form className="birth-form" onSubmit={saveBirth}><label className="field"><span className="field__label">Sexo</span><select value={birth.gender} onChange={(e) => setBirth({ ...birth, gender: e.target.value as GenderPrediction })}><option value="Boy">Mano</option><option value="Girl">Mana</option></select></label><TextInput label="Data" type="text" inputMode="numeric" autoComplete="off" placeholder="dd/mm/yyyy" maxLength={10} pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" value={birth.birthDate} onChange={(e) => setBirth({ ...birth, birthDate: maskDateInput(e.target.value) })} required /><TextInput label="Hora" type="text" inputMode="numeric" autoComplete="off" placeholder="HH:mm" maxLength={5} pattern="([01][0-9]|2[0-3]):[0-5][0-9]" value={birth.birthTime} onChange={(e) => setBirth({ ...birth, birthTime: maskTimeInput(e.target.value) })} required /><NumberStepper label="Peso" name="birth-weight" min={1000} max={6000} placeholder={3500} suffix="g" value={birth.weightGrams ? String(birth.weightGrams) : ""} onChange={(value) => setBirth({ ...birth, weightGrams: Number(value) })} required /><NumberStepper label="Altura" name="birth-height" min={30} max={70} placeholder={50} suffix="cm" value={birth.heightCentimeters ? String(birth.heightCentimeters) : ""} onChange={(value) => setBirth({ ...birth, heightCentimeters: Number(value) })} required /><TextInput label="Nome" value={birth.name} onChange={(e) => setBirth({ ...birth, name: e.target.value })} required /><TextInput label="URL da fotografia (opcional)" type="url" value={birth.photoUrl || ""} onChange={(e) => setBirth({ ...birth, photoUrl: e.target.value })} />{error && <p className="form-error" role="alert">{error}</p>}<Button type="submit" disabled={saving}>{saving ? "A guardar..." : "Guardar em segredo"}</Button></form>}
    </section>
    <section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Participantes</p><h2>Últimos palpites</h2></div><Button variant="ghost" onClick={exportCsv}>Exportar CSV</Button></div><div className="admin-table"><div className="admin-table__head"><span>Nome</span><span>Palpite</span><span>Data</span><span>Altura</span><span /></div>{predictions.map((prediction) => <div key={prediction.id}><strong>{prediction.name}</strong><span>{genderLabel(prediction.gender)}</span><span>{prediction.predictedBirthDate || "—"}</span><span>{prediction.predictedHeightCentimeters === undefined ? "—" : `${prediction.predictedHeightCentimeters} cm`}</span><button onClick={() => remove(prediction.id, prediction.name)} aria-label={`Remover palpite de ${prediction.name}`}>Remover</button></div>)}</div></section>
  </main>;
}
