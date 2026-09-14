import { apiRequest, isMock } from "./client";
import { mockStore } from "./mockStore";
import type { EventData } from "@/lib/types";
import { decodeEvent, type ApiEvent } from "./contracts";

export const eventApi = {
  async get(): Promise<EventData> {
    return isMock() ? mockStore.getEvent() : decodeEvent(await apiRequest<ApiEvent>("/api/event"));
  },
};
