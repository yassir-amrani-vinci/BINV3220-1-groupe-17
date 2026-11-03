import { Router } from "express";
import { toApplicationDto } from "../mappers/application.mapper.ts";
import { getCurrentUser } from "../middlewares/authenticate.ts";
import type { ApplicationsService } from "../services/applications.service.ts";
import { HttpError } from "../utils/httpError.ts";

const parsePositiveInteger = (value: unknown, field: string): number => {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value <= 0
  ) {
    throw new HttpError(400, "INVALID_BODY", `${field} doit être un entier positif`);
  }
  return value;
};

const parseApplicationBody = (body: unknown): { offerId: number; message: string | null } => {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new HttpError(400, "INVALID_BODY", "Le corps de la requête est invalide");
  }
  const data = body as Record<string, unknown>;
  const offerId = parsePositiveInteger(data.offerId, "offerId");
  if (data.message !== undefined && data.message !== null && typeof data.message !== "string") {
    throw new HttpError(400, "INVALID_BODY", "message doit être une chaîne de caractères");
  }
  const message = typeof data.message === "string" ? data.message.trim() : null;
  return { offerId, message: message === "" ? null : message };
};

export const createApplicationsRouter = (applicationsService: ApplicationsService) => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json(
      applicationsService.listApplications(getCurrentUser(req)).map(toApplicationDto),
    );
  });

  router.post("/", (req, res) => {
    const { offerId, message } = parseApplicationBody(req.body);
    res.status(201).json(
      toApplicationDto(
        applicationsService.createApplication(getCurrentUser(req), offerId, message),
      ),
    );
  });

  router.post("/:id/withdraw", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      throw new HttpError(400, "INVALID_QUERY", "L'identifiant de candidature est invalide");
    }
    res.json(
      toApplicationDto(
        applicationsService.withdrawApplication(getCurrentUser(req), id),
      ),
    );
  });

  return router;
};
