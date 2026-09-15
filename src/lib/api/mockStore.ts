import type {
  BirthResult,
  EventData,
  Prediction,
  PredictionRequest,
  PredictionStats,
  RankingEntry,
} from "@/lib/types";

const PREDICTIONS_KEY = "manomana.predictions";
const EVENT_KEY = "manomana.event";

const seed: Prediction[] = [
  { id: "1", name: "Maria", gender: "Girl", predictedBirthDate: "2026-09-18", predictedBirthTime: "03:42", predictedWeightGrams: 3240, predictedHeightCentimeters: 50, predictedName: "Madalena", createdAt: "2026-09-11T19:10:00Z" },
  { id: "2", name: "Pedro", gender: "Boy", predictedBirthDate: "2026-09-20", predictedBirthTime: "08:15", predictedWeightGrams: 3380, predictedHeightCentimeters: 51, predictedName: "Tomás", createdAt: "2026-09-12T08:05:00Z" },
  { id: "3", name: "Sofia", gender: "Girl", predictedBirthDate: "2026-09-17", predictedBirthTime: "22:30", predictedWeightGrams: 3180, predictedHeightCentimeters: 49, predictedName: "Leonor", createdAt: "2026-09-13T14:20:00Z" },
  { id: "4", name: "Miguel", gender: "Boy", predictedBirthDate: "2026-09-19", predictedBirthTime: "11:05", predictedWeightGrams: 3310, predictedHeightCentimeters: 52, predictedName: "Duarte", createdAt: "2026-09-14T09:30:00Z" },
  { id: "5", name: "Inês", gender: "Girl", predictedBirthDate: "2026-09-18", predictedBirthTime: "05:20", predictedWeightGrams: 3260, predictedHeightCentimeters: 50, predictedName: "Margarida", createdAt: "2026-09-14T12:00:00Z" },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
}

function write<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("manomana:change"));
}

export const mockStore = {
  getEvent(): EventData {
    return read<EventData>(EVENT_KEY, { status: "Open" });
  },
  setEvent(event: EventData) {
    write(EVENT_KEY, event);
  },
  getPredictions(): Prediction[] {
    return read(PREDICTIONS_KEY, seed);
  },
  addPrediction(request: PredictionRequest): Prediction {
    const prediction: Prediction = {
      ...request,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    write(PREDICTIONS_KEY, [prediction, ...this.getPredictions()]);
    return prediction;
  },
  removePrediction(id: string) {
    write(PREDICTIONS_KEY, this.getPredictions().filter((item) => item.id !== id));
  },
  reset() {
    write(EVENT_KEY, { status: "Open" } satisfies EventData);
    write(PREDICTIONS_KEY, [] satisfies Prediction[]);
  },
  getStats(): PredictionStats {
    const predictions = this.getPredictions();
    const boy = predictions.filter((item) => item.gender === "Boy").length;
    const girl = predictions.length - boy;
    const weights = predictions.flatMap((item) => item.predictedWeightGrams ? [item.predictedWeightGrams] : []);
    const heights = predictions.flatMap((item) => item.predictedHeightCentimeters ? [item.predictedHeightCentimeters] : []);
    const dates = predictions.flatMap((item) => item.predictedBirthDate ? [new Date(`${item.predictedBirthDate}T12:00:00Z`).getTime()] : []);
    const avgDate = dates.length ? new Date(dates.reduce((a, b) => a + b, 0) / dates.length).toISOString().slice(0, 10) : undefined;
    return {
      total: predictions.length,
      boy,
      girl,
      boyPercentage: predictions.length ? Math.round((boy / predictions.length) * 100) : 50,
      girlPercentage: predictions.length ? Math.round((girl / predictions.length) * 100) : 50,
      averageBirthDate: avgDate,
      averageWeightGrams: weights.length ? Math.round(weights.reduce((a, b) => a + b, 0) / weights.length) : undefined,
      averageHeightCentimeters: heights.length ? Math.round(heights.reduce((a, b) => a + b, 0) / heights.length) : undefined,
      recentParticipants: predictions.slice(0, 5).map(({ name, gender }) => ({ name, gender })),
    };
  },
  getRanking(): RankingEntry[] {
    const event = this.getEvent();
    if (!event.birth) return [];
    const birth = event.birth;
    return this.getPredictions().map((prediction) => {
      const genderCorrect = prediction.gender === birth.gender;
      const dateDifferenceDays = prediction.predictedBirthDate
        ? Math.abs((new Date(`${prediction.predictedBirthDate}T12:00:00Z`).getTime() - new Date(`${birth.birthDate}T12:00:00Z`).getTime()) / 86400000)
        : undefined;
      const timeDifferenceMinutes = prediction.predictedBirthTime
        ? Math.abs(toMinutes(prediction.predictedBirthTime) - toMinutes(birth.birthTime))
        : undefined;
      const weightDifferenceGrams = prediction.predictedWeightGrams ? prediction.predictedWeightGrams - birth.weightGrams : undefined;
      const heightDifferenceCentimeters = prediction.predictedHeightCentimeters ? prediction.predictedHeightCentimeters - birth.heightCentimeters : undefined;
      const datePoints = dateDifferenceDays === undefined || dateDifferenceDays > 7 ? 0 : 40 - dateDifferenceDays * 5;
      const timePoints = timeDifferenceMinutes === undefined ? 0 : Math.max(0, 30 - Math.floor(timeDifferenceMinutes / 30) * 5);
      const absWeight = Math.abs(weightDifferenceGrams ?? Infinity);
      const weightPoints = absWeight <= 25 ? 30 : absWeight <= 50 ? 25 : absWeight <= 100 ? 20 : absWeight <= 150 ? 15 : absWeight <= 250 ? 10 : absWeight <= 400 ? 5 : 0;
      const absHeight = Math.abs(heightDifferenceCentimeters ?? Infinity);
      const heightPoints = absHeight === 0 ? 30 : absHeight === 1 ? 25 : absHeight === 2 ? 20 : absHeight === 3 ? 15 : absHeight === 4 ? 10 : absHeight === 5 ? 5 : 0;
      return {
        id: prediction.id,
        position: 0,
        name: prediction.name,
        points: (genderCorrect ? 100 : 0) + datePoints + timePoints + weightPoints + heightPoints,
        genderCorrect,
        dateDifferenceDays,
        timeDifferenceMinutes,
        weightDifferenceGrams,
        heightDifferenceCentimeters,
        nameCorrect: prediction.predictedName?.trim().toLocaleLowerCase("pt") === birth.name.trim().toLocaleLowerCase("pt"),
      };
    }).sort((a, b) => b.points - a.points).map((entry, index) => ({ ...entry, position: index + 1 }));
  },
};

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
