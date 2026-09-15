import { apiRequest, isMock } from "./client";
import { mockStore } from "./mockStore";
import type { AdminSession, BirthResult, EventData, Prediction } from "@/lib/types";
import { decodePrediction, encodeBirth, type ApiPrediction } from "./contracts";
import { eventApi } from "./eventApi";

export const adminApi = {
  async login(username: string, password: string): Promise<AdminSession> {
    if (isMock()) {
      if (username === "admin" && password === "dino") return { token: "mock-admin-token" };
      throw new Error("Credenciais inválidas.");
    }
    const response = await apiRequest<{ accessToken: string }>("/api/admin/login", { method: "POST", body: JSON.stringify({ username, password }) });
    return { token: response.accessToken };
  },
  async predictions(token: string): Promise<Prediction[]> {
    return isMock() ? mockStore.getPredictions() : (await apiRequest<ApiPrediction[]>("/api/admin/predictions", { headers: { Authorization: `Bearer ${token}` } })).map(decodePrediction);
  },
  async setOpen(open: boolean, token: string): Promise<EventData> {
    if (isMock()) {
      const current = mockStore.getEvent();
      const event = { ...current, status: open ? "Open" as const : "Closed" as const };
      mockStore.setEvent(event);
      return event;
    }
    await apiRequest<void>(`/api/admin/event/${open ? "open" : "close"}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    return eventApi.get();
  },
  async saveBirth(birth: BirthResult, token: string): Promise<EventData> {
    if (isMock()) {
      const event: EventData = { status: "Born", birth };
      mockStore.setEvent(event);
      return event;
    }
    await apiRequest<void>("/api/admin/birth", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(encodeBirth(birth)) });
    return eventApi.get();
  },
  async publish(token: string): Promise<EventData> {
    if (isMock()) {
      const current = mockStore.getEvent();
      const event: EventData = { ...current, status: "Published" };
      mockStore.setEvent(event);
      return event;
    }
    await apiRequest<void>("/api/admin/birth/publish", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    return eventApi.get();
  },
  async reset(token: string): Promise<void> {
    if (isMock()) return mockStore.reset();
    await apiRequest<void>("/api/admin/event/reset", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
  },
  async removePrediction(id: string, token: string) {
    if (isMock()) return mockStore.removePrediction(id);
    return apiRequest<void>(`/api/admin/predictions/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  },
};
