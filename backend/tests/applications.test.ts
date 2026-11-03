import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { CONTACT, OFFER, STUDENT } from "../src/db/seed/seedIds.ts";
import { createTestApp, tokenFor } from "./helpers/testApp.ts";

let app: ReturnType<typeof createTestApp>;

beforeEach(() => {
  app = createTestApp();
});

const studentToken = (id: number) => tokenFor("STUDENT", id);

describe("GET /applications", () => {
  it("retourne uniquement les candidatures de l'étudiant connecté", async () => {
    const response = await request(app)
      .get("/applications")
      .set("Authorization", studentToken(STUDENT.INES_HADDAD));

    expect(response.status).toBe(200);
    expect(response.body.map((application: { offerId: number }) => application.offerId)).toEqual(
      [OFFER.FLEET_APP, OFFER.BILLING_API],
    );
  });

  it("refuse l'accès à un contact", async () => {
    const response = await request(app)
      .get("/applications")
      .set("Authorization", tokenFor("CONTACT", CONTACT.MARC_LEJEUNE));

    expect(response.status).toBe(403);
  });
});

describe("POST /applications", () => {
  it("crée une candidature avec un message facultatif", async () => {
    const response = await request(app)
      .post("/applications")
      .set("Authorization", studentToken(STUDENT.LUCAS_DUPONT))
      .send({ offerId: OFFER.DATA_QUALITY, message: "Mon message" });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      offerId: OFFER.DATA_QUALITY,
      message: "Mon message",
      status: "IN_PROGRESS",
    });
  });

  it("refuse une deuxième candidature active", async () => {
    const response = await request(app)
      .post("/applications")
      .set("Authorization", studentToken(STUDENT.LUCAS_DUPONT))
      .send({ offerId: OFFER.FLEET_APP });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("DUPLICATE_APPLICATION");
  });

  it("autorise une nouvelle candidature après un retrait", async () => {
    const response = await request(app)
      .post("/applications")
      .set("Authorization", studentToken(STUDENT.INES_HADDAD))
      .send({ offerId: OFFER.BILLING_API });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("IN_PROGRESS");
  });

  it("refuse une offre non publiée", async () => {
    const response = await request(app)
      .post("/applications")
      .set("Authorization", studentToken(STUDENT.LUCAS_DUPONT))
      .send({ offerId: OFFER.CLIENT_PORTAL });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_APPLICATION");
  });
});

describe("POST /applications/:id/withdraw", () => {
  it("retire une candidature en cours", async () => {
    const response = await request(app)
      .post("/applications/1/withdraw")
      .set("Authorization", studentToken(STUDENT.LUCAS_DUPONT));

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("WITHDRAWN");
  });

  it("refuse le retrait d'une candidature traitée", async () => {
    const response = await request(app)
      .post("/applications/3/withdraw")
      .set("Authorization", studentToken(STUDENT.MATEUSZ_KOWALSKI));

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("APPLICATION_PROCESSED");
  });
});
