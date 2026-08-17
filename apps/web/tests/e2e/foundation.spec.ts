import { expect, test } from "@playwright/test";

test("homepage, docs and blog render the copied frontend shell", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /KoshLang/i }).first()).toBeVisible();
  await expect(page.getByRole("navigation").first()).toBeVisible();

  await page.goto("/docs");
  await expect(page.getByRole("heading", { name: /Build with KoshLang/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Install KoshLang/i })).toBeVisible();

  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: /Engineering Blog/i })).toBeVisible();
});
