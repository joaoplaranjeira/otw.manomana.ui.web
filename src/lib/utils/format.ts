import type { GenderPrediction } from "@/lib/types";

export const genderLabel = (gender: GenderPrediction) =>
  gender === "Boy" ? "MANO" : "MANA";

export const formatDate = (value?: string, withYear = false) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
};

export const formatWeight = (grams?: number) => {
  if (!grams) return "—";
  return `${new Intl.NumberFormat("pt-PT", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(grams / 1000)} kg`;
};

export const formatHeight = (centimeters?: number) =>
  centimeters === undefined ? "—" : `${centimeters} cm`;

export const maskDateInput = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)]
    .filter(Boolean)
    .join("/");
};

export const displayDateToIso = (value: string) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return undefined;
  const [, day, month, year] = match;
  const date = new Date(`${year}-${month}-${day}T12:00:00Z`);
  if (date.getUTCFullYear() !== Number(year) || date.getUTCMonth() + 1 !== Number(month) || date.getUTCDate() !== Number(day)) return undefined;
  return `${year}-${month}-${day}`;
};

export const isoDateToDisplay = (value?: string) => {
  if (!value) return "";
  const [year, month, day] = value.slice(0, 10).split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
};

export const maskTimeInput = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits;
};

export const isValidTimeInput = (value: string) => {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  return !!match && Number(match[1]) <= 23 && Number(match[2]) <= 59;
};
