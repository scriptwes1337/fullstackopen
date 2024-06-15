const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`/api/test/reset`);
    await request.post(`/api/users/register`, {
      data: {
        username: "user1",
        name: "user1",
        password: "password1",
      },
    });
    await page.goto(`/`);
  });

  test("5.17: Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByTestId("login")).toBeVisible();
  });
});
