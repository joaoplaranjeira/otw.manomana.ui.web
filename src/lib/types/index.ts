export type GenderPrediction = "Boy" | "Girl";
export type EventStatus = "Open" | "Closed" | "Born" | "Published";

export interface PredictionRequest {
  name: string;
  gender: GenderPrediction;
  predictedBirthDate?: string;
  predictedBirthTime?: string;
  predictedWeightGrams?: number;
  predictedHeightCentimeters?: number;
  predictedName?: string;
}

export interface Prediction extends PredictionRequest {
  id: string;
  createdAt: string;
}

export interface PredictionStats {
  total: number;
  boy: number;
  girl: number;
  boyPercentage: number;
  girlPercentage: number;
  averageBirthDate?: string;
  averageWeightGrams?: number;
  averageHeightCentimeters?: number;
  recentParticipants?: Array<{ name: string; gender: GenderPrediction }>;
}

export interface BirthResult {
  gender: GenderPrediction;
  birthDate: string;
  birthTime: string;
  weightGrams: number;
  heightCentimeters: number;
  name: string;
  photoUrl?: string;
}

export interface EventData {
  status: EventStatus;
  birth?: BirthResult;
}

export interface RankingEntry {
  id: string;
  position: number;
  name: string;
  points: number;
  genderCorrect: boolean;
  dateDifferenceDays?: number;
  timeDifferenceMinutes?: number;
  weightDifferenceGrams?: number;
  heightDifferenceCentimeters?: number;
  nameCorrect?: boolean;
}

export interface AdminSession {
  token: string;
}
