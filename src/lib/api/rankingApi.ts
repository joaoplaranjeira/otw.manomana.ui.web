import { apiRequest, isMock } from "./client";
import { mockStore } from "./mockStore";
import type { RankingEntry } from "@/lib/types";
import { decodeRanking, type ApiRankingEntry } from "./contracts";

export const rankingApi = {
  async list(): Promise<RankingEntry[]> {
    return isMock() ? mockStore.getRanking() : (await apiRequest<ApiRankingEntry[]>("/api/ranking")).map(decodeRanking);
  },
};
