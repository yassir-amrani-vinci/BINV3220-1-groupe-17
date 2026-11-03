import type { Application } from "../models/application.ts";
import { API_URL, readJson } from "../utils/api.ts";
import { isApplication, isApplicationList } from "../utils/guards.ts";

export const getApplications = async (
  token: string,
  signal?: AbortSignal,
): Promise<Application[]> => {
  const response = await fetch(`${API_URL}/applications`, {
    headers: { Authorization: token },
    signal,
  });
  return readJson(response, isApplicationList, "Chargement des candidatures impossible");
};

export const createApplication = async (
  token: string,
  offerId: number,
  message: string,
): Promise<Application> => {
  const response = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ offerId, message }),
  });
  return readJson(response, isApplication, "Création de la candidature impossible");
};

export const withdrawApplication = async (
  token: string,
  id: number,
): Promise<Application> => {
  const response = await fetch(`${API_URL}/applications/${id}/withdraw`, {
    method: "POST",
    headers: { Authorization: token },
  });
  return readJson(response, isApplication, "Retrait de la candidature impossible");
};
