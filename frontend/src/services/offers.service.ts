import type { Offer, PeriodCode } from "../models/offer.ts";
import { API_URL, readJson } from "../utils/api.ts";
import { isOfferList } from "../utils/guards.ts";

export const getOffers = async (
  token: string,
  period?: PeriodCode,
  search?: string,
  signal?: AbortSignal,
): Promise<Offer[]> => {
  const params: string[] = [];
  if (period !== undefined) params.push(`period=${encodeURIComponent(period)}`);
  if (search?.trim()) params.push(`q=${encodeURIComponent(search.trim())}`);
  const query = params.length > 0 ? `?${params.join("&")}` : "";

  const response = await fetch(`${API_URL}/offers${query}`, {
    headers: { Authorization: token },
    signal,
  });
  return readJson(response, isOfferList, "Chargement des offres impossible");
};
