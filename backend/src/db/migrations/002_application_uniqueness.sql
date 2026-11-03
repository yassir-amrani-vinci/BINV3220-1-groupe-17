CREATE UNIQUE INDEX applications_one_active_per_student_offer
  ON applications (student_id, offer_id)
  WHERE status <> 'WITHDRAWN';
