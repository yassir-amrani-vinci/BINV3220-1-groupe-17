import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ApplicationsPage from "../src/pages/ApplicationsPage.tsx";
import { stubFetch, studentUser } from "./helpers/fetchMock.ts";

const application = {
  id: 1,
  offerId: 1,
  offerTitle: "Application de gestion de flotte",
  companyShortName: "Lumen Digital",
  message: "Mon message",
  status: "IN_PROGRESS",
  appliedAt: "2026-10-02 18:10:00",
};

describe("ApplicationsPage", () => {
  it("affiche les candidatures et leurs statuts français", async () => {
    stubFetch({ "/api/applications": () => Response.json([application]) });

    render(
      <ApplicationsPage user={studentUser} token="jeton" onUnauthorized={vi.fn()} />,
    );

    expect(await screen.findByText("Application de gestion de flotte")).toBeInTheDocument();
    expect(screen.getByText("En cours")).toBeInTheDocument();
    expect(screen.getByText("Mon message")).toBeInTheDocument();
  });

  it("demande le retrait d'une candidature en cours", async () => {
    let current = application;
    const fetchMock = stubFetch({
      "/api/applications/1/withdraw": () => {
        current = { ...application, status: "WITHDRAWN" };
        return Response.json(current);
      },
      "/api/applications": () => Response.json([current]),
    });

    render(
      <ApplicationsPage user={studentUser} token="jeton" onUnauthorized={vi.fn()} />,
    );
    await screen.findByText("Application de gestion de flotte");

    fireEvent.click(screen.getByRole("button", { name: "Retirer" }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/applications/1/withdraw",
        expect.objectContaining({ method: "POST" }),
      ),
    );
    expect(await screen.findByText("Retirée")).toBeInTheDocument();
  });
});
