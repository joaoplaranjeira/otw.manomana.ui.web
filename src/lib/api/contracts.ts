import type {
  BirthResult,
  EventData,
  EventStatus,
  GenderPrediction,
  Prediction,
  PredictionRequest,
  PredictionStats,
  RankingEntry,
} from "@/lib/types";

type ApiGender = 1 | 2;
type ApiEventStatus = 1 | 2 | 3 | 4;

interface ApiBirth {
  gender: ApiGender;
  birthDate: string;
  birthTime: string;
  weightGrams: number;
  heightCentimeters: number;
  name: string | null;
  photoUrl: string | null;
}

export interface ApiEvent {
  status: ApiEventStatus;
  birth: ApiBirth | null;
}

export interface ApiStats {
  total: number;
  boy: number;
  girl: number;
  boyPercentage: number;
  girlPercentage: number;
  averagePredictedBirthDate: string | null;
  averagePredictedWeightGrams: number | null;
  averagePredictedHeightCentimeters: number | null;
}

export interface ApiPrediction {
  id: string;
  participantName: string | null;
  gender: ApiGender;
  predictedBirthDate: string | null;
  predictedBirthTime: string | null;
  predictedWeightGrams: number | null;
  predictedHeightCentimeters: number | null;
  predictedName: string | null;
  createdAt: string;
}

export interface ApiRankingEntry {
  position: number;
  predictionId: string;
  participantName: string | null;
  totalScore: number;
  genderCorrect: boolean;
  birthDateDifferenceDays: number | null;
  birthTimeDifferenceMinutes: number | null;
  weightDifferenceGrams: number | null;
  heightDifferenceCentimeters: number | null;
  nameCorrect: boolean;
}

const statuses: Record<ApiEventStatus, EventStatus> = { 1: "Open", 2: "Closed", 3: "Born", 4: "Published" };

export const decodeGender = (gender: ApiGender): GenderPrediction => gender === 1 ? "Boy" : "Girl";
export const encodeGender = (gender: GenderPrediction): ApiGender => gender === "Boy" ? 1 : 2;

export function decodeEvent(value: ApiEvent): EventData {
  return {
    status: statuses[value.status],
    ...(value.birth && {
      birth: {
        gender: decodeGender(value.birth.gender),
        birthDate: value.birth.birthDate,
        birthTime: value.birth.birthTime.slice(0, 5),
        weightGrams: value.birth.weightGrams,
        heightCentimeters: value.birth.heightCentimeters,
        name: value.birth.name ?? "Dino",
        ...(value.birth.photoUrl && { photoUrl: value.birth.photoUrl }),
      },
    }),
  };
}

export function encodePrediction(value: PredictionRequest) {
  return { ...value, gender: encodeGender(value.gender) };
}

export function encodeBirth(value: BirthResult) {
  return { ...value, gender: encodeGender(value.gender) };
}

export function decodeStats(value: ApiStats): PredictionStats {
  return {
    total: value.total,
    boy: value.boy,
    girl: value.girl,
    boyPercentage: value.boyPercentage,
    girlPercentage: value.girlPercentage,
    averageBirthDate: value.averagePredictedBirthDate ?? undefined,
    averageWeightGrams: value.averagePredictedWeightGrams ?? undefined,
    averageHeightCentimeters: value.averagePredictedHeightCentimeters ?? undefined,
  };
}

export function decodePrediction(value: ApiPrediction): Prediction {
  return {
    id: value.id,
    name: value.participantName ?? "Sem nome",
    gender: decodeGender(value.gender),
    predictedBirthDate: value.predictedBirthDate ?? undefined,
    predictedBirthTime: value.predictedBirthTime?.slice(0, 5),
    predictedWeightGrams: value.predictedWeightGrams ?? undefined,
    predictedHeightCentimeters: value.predictedHeightCentimeters ?? undefined,
    predictedName: value.predictedName ?? undefined,
    createdAt: value.createdAt,
  };
}

export function decodeRanking(value: ApiRankingEntry): RankingEntry {
  return {
    id: value.predictionId,
    position: value.position,
    name: value.participantName ?? "Sem nome",
    points: value.totalScore,
    genderCorrect: value.genderCorrect,
    dateDifferenceDays: value.birthDateDifferenceDays ?? undefined,
    timeDifferenceMinutes: value.birthTimeDifferenceMinutes ?? undefined,
    weightDifferenceGrams: value.weightDifferenceGrams ?? undefined,
    heightDifferenceCentimeters: value.heightDifferenceCentimeters ?? undefined,
    nameCorrect: value.nameCorrect,
  };
}
