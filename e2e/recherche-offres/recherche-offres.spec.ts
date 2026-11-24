import { expect, test } from "@playwright/test";

const signInAsLucas = async (page: import("@playwright/test").Page): Promise<void> => {
  await page.goto("/");
  await page.getByRole("button", { name: "Lucas Dupont" }).click();
  await page.getByRole("link", { name: "Offres" }).click();
  await expect(page.getByRole("heading", { name: "Offres de stage" })).toBeVisible();
};

test("scénario 1 — recherche avec résultat", async ({ page }) => {
  await signInAsLucas(page);

  await page.getByRole("searchbox", { name: "Rechercher par mot-clé" }).fill("api rest");

  await expect(page.getByText("API REST de facturation")).toBeVisible();
  await expect(page.getByRole("row")).toHaveCount(2);
  await expect(page.getByText("Assistant conversationnel interne")).toHaveCount(0);
});

test("scénario 2 — recherche sans résultat", async ({ page }) => {
  await signInAsLucas(page);

  await page
    .getByRole("searchbox", { name: "Rechercher par mot-clé" })
    .fill("zzz-introuvable");

  await expect(
    page.getByText("Aucune offre ne correspond à la recherche."),
  ).toBeVisible();
  await expect(page.getByRole("table")).toHaveCount(0);
});
