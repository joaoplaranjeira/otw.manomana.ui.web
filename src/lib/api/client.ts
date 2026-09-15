const isMock = () => process.env.NEXT_PUBLIC_API_MODE !== "remote";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiBaseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL não configurado.");

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Não foi possível comunicar com o servidor.");
  }

  if (response.status === 204) return undefined as T;
  const body = await response.text();
  return body ? JSON.parse(body) as T : undefined as T;
}

export { isMock };
