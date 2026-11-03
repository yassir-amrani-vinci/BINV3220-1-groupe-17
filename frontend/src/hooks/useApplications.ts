import { useCallback, useEffect, useState } from "react";
import type { Application } from "../models/application.ts";
import {
  createApplication,
  getApplications,
  withdrawApplication,
} from "../services/applications.service.ts";
import { isUnauthorized } from "../utils/api.ts";

export const useApplications = (
  token: string,
  onUnauthorized: () => void,
  enabled = true,
) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!enabled) return;
    setIsLoading(true);
    setError(null);
    try {
      setApplications(await getApplications(token));
    } catch (reason: unknown) {
      if (isUnauthorized(reason)) {
        onUnauthorized();
      } else {
        setError(reason instanceof Error ? reason.message : "Erreur inconnue");
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, onUnauthorized, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    getApplications(token, controller.signal)
      .then(setApplications)
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        if (isUnauthorized(reason)) onUnauthorized();
        else setError(reason instanceof Error ? reason.message : "Erreur inconnue");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [token, onUnauthorized, enabled]);

  const apply = async (offerId: number, message: string): Promise<boolean> => {
    setError(null);
    try {
      await createApplication(token, offerId, message);
      await load();
      return true;
    } catch (reason: unknown) {
      if (isUnauthorized(reason)) onUnauthorized();
      else setError(reason instanceof Error ? reason.message : "Erreur inconnue");
      return false;
    }
  };

  const withdraw = async (id: number): Promise<boolean> => {
    setError(null);
    try {
      await withdrawApplication(token, id);
      await load();
      return true;
    } catch (reason: unknown) {
      if (isUnauthorized(reason)) onUnauthorized();
      else setError(reason instanceof Error ? reason.message : "Erreur inconnue");
      return false;
    }
  };

  return { applications, isLoading, error, apply, withdraw };
};
