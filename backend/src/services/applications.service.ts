import { toApplication } from "../mappers/application.mapper.ts";
import type { Application } from "../models/application.ts";
import type { User } from "../models/user.ts";
import type { ApplicationsRepository } from "../repositories/applications.repository.ts";
import { HttpError } from "../utils/httpError.ts";
import { isStudent } from "./permissions.ts";

const requireStudent = (viewer: User): void => {
  if (!isStudent(viewer)) {
    throw new HttpError(403, "FORBIDDEN", "Seul un étudiant peut gérer ses candidatures");
  }
};

export const createApplicationsService = (repository: ApplicationsRepository) => ({
  listApplications: (viewer: User): Application[] => {
    requireStudent(viewer);
    return repository.findByStudent(viewer.id).map(toApplication);
  },

  createApplication: (viewer: User, offerId: number, message: string | null): Application => {
    requireStudent(viewer);
    if (repository.offerStatus(offerId) !== "PUBLISHED") {
      throw new HttpError(400, "INVALID_APPLICATION", "La candidature doit concerner une offre publiée");
    }
    if (repository.findActive(offerId, viewer.id) !== undefined) {
      throw new HttpError(409, "DUPLICATE_APPLICATION", "Vous avez déjà une candidature active pour cette offre");
    }
    const id = repository.create({ offerId, studentId: viewer.id, message });
    const application = repository.findByIdForStudent(id, viewer.id);
    if (application === undefined) {
      throw new HttpError(500, "INTERNAL_ERROR", "La candidature créée est introuvable");
    }
    return toApplication(application);
  },

  withdrawApplication: (viewer: User, id: number): Application => {
    requireStudent(viewer);
    const application = repository.findByIdForStudent(id, viewer.id);
    if (application === undefined) {
      throw new HttpError(404, "NOT_FOUND", "Candidature introuvable");
    }
    if (application.status !== "IN_PROGRESS") {
      throw new HttpError(409, "APPLICATION_PROCESSED", "Cette candidature a déjà été traitée");
    }
    const withdrawn = repository.withdraw(id, viewer.id);
    if (withdrawn === undefined) {
      throw new HttpError(409, "APPLICATION_PROCESSED", "Cette candidature a déjà été traitée");
    }
    return toApplication({
      ...withdrawn,
      offer_title: application.offer_title,
      company_short_name: application.company_short_name,
    });
  },
});

export type ApplicationsService = ReturnType<typeof createApplicationsService>;
