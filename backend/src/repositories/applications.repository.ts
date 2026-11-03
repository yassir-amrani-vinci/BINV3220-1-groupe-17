import type { Db } from "../db/database.ts";
import type { ApplicationDbo } from "../models/application.ts";

interface CreateApplicationParams {
  offerId: number;
  studentId: number;
  message: string | null;
}

export const createApplicationsRepository = (db: Db) => {
  const findByStudent = db.prepare<{ studentId: number }, ApplicationDbo>(`
    SELECT a.id, a.offer_id, a.student_id, o.title AS offer_title,
           c.short_name AS company_short_name, a.message, a.status, a.applied_at
    FROM applications a
    JOIN offers o ON o.id = a.offer_id
    JOIN companies c ON c.id = o.company_id
    WHERE a.student_id = @studentId
    ORDER BY a.applied_at DESC, a.id DESC
  `);
  const findByIdForStudent = db.prepare<{ id: number; studentId: number }, ApplicationDbo>(`
    SELECT a.id, a.offer_id, a.student_id, o.title AS offer_title,
           c.short_name AS company_short_name, a.message, a.status, a.applied_at
    FROM applications a
    JOIN offers o ON o.id = a.offer_id
    JOIN companies c ON c.id = o.company_id
    WHERE a.id = @id AND a.student_id = @studentId
  `);
  const findActive = db.prepare<{ offerId: number; studentId: number }, { id: number }>(`
    SELECT id
    FROM applications
    WHERE offer_id = @offerId AND student_id = @studentId AND status <> 'WITHDRAWN'
  `);
  const offerIsPublished = db.prepare<{ offerId: number }, { status: string }>(`
    SELECT status FROM offers WHERE id = @offerId
  `);
  const insert = db.prepare<CreateApplicationParams, { id: number }>(`
    INSERT INTO applications (offer_id, student_id, message)
    VALUES (@offerId, @studentId, @message)
    RETURNING id
  `);
  const withdraw = db.prepare<{ id: number; studentId: number }, ApplicationDbo>(`
    UPDATE applications
    SET status = 'WITHDRAWN'
    WHERE id = @id AND student_id = @studentId AND status = 'IN_PROGRESS'
    RETURNING id, offer_id, student_id, NULL AS offer_title, NULL AS company_short_name,
              message, status, applied_at
  `);

  return {
    findByStudent: (studentId: number): ApplicationDbo[] => findByStudent.all({ studentId }),
    findByIdForStudent: (id: number, studentId: number): ApplicationDbo | undefined =>
      findByIdForStudent.get({ id, studentId }),
    findActive: (offerId: number, studentId: number): { id: number } | undefined =>
      findActive.get({ offerId, studentId }),
    offerStatus: (offerId: number): string | undefined => offerIsPublished.get({ offerId })?.status,
    create: ({ offerId, studentId, message }: CreateApplicationParams): number =>
      (insert.get({ offerId, studentId, message }) as { id: number }).id,
    withdraw: (id: number, studentId: number): ApplicationDbo | undefined =>
      withdraw.get({ id, studentId }),
  };
};

export type ApplicationsRepository = ReturnType<typeof createApplicationsRepository>;
