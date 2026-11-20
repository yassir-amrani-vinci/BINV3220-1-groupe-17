import { Router } from "express";
import { toOfferDto } from "../mappers/offer.mapper.ts";
import { getCurrentUser } from "../middlewares/authenticate.ts";
import { authorize } from "../middlewares/authorize.ts";
import type { OffersService } from "../services/offers.service.ts";
import { canListOffers } from "../services/permissions.ts";
import { HttpError } from "../utils/httpError.ts";

const PERIOD_CODES = ["P1", "P2", "OTHER"] as const;
type PeriodCode = (typeof PERIOD_CODES)[number];
const MAX_SEARCH_LENGTH = 100;

const parsePeriod = (value: unknown): PeriodCode | undefined => {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || !PERIOD_CODES.includes(value as PeriodCode)) {
    throw new HttpError(400, "INVALID_QUERY", "Le paramètre period doit valoir P1, P2 ou OTHER");
  }
  return value as PeriodCode;
};

const parseSearch = (value: unknown): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    throw new HttpError(400, "INVALID_QUERY", "Le paramètre q doit apparaître une seule fois");
  }
  if (value.length > MAX_SEARCH_LENGTH) {
    throw new HttpError(
      400,
      "INVALID_QUERY",
      `Le paramètre q ne peut pas dépasser ${MAX_SEARCH_LENGTH} caractères`,
    );
  }

  const search = value.trim();
  return search === "" ? undefined : search;
};

export const createOffersRouter = (offersService: OffersService) => {
  const router = Router();

  router.get("/", authorize(canListOffers), (req, res) => {
    const period = parsePeriod(req.query.period);
    const search = parseSearch(req.query.q);
    res.json(offersService.listOffers(getCurrentUser(req), period, search).map(toOfferDto));
  });

  return router;
};
