import { apiRequest, isMock } from "./client";
import { mockStore } from "./mockStore";
import type { Prediction, PredictionRequest, PredictionStats } from "@/lib/types";
import { decodeStats, encodePrediction, type ApiStats } from "./contracts";

interface CreatedPrediction { id: string; editToken?: string | null }

export const predictionApi = {
  async create(request: PredictionRequest): Promise<Prediction | CreatedPrediction> {
    return isMock() ? mockStore.addPrediction(request) : apiRequest<CreatedPrediction>("/api/predictions", { method: "POST", body: JSON.stringify(encodePrediction(request)) });
  },
  async stats(): Promise<PredictionStats> {
    return isMock() ? mockStore.getStats() : decodeStats(await apiRequest<ApiStats>("/api/predictions/stats"));
  },
};
