const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  let usernameInput;
  let passwordInput;
  let loginButton;

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
    usernameInput = await page.getByTestId("username");
    passwordInput = await page.getByTestId("password");
    loginButton = await page.getByTestId("login");
  });

  test("5.17: Login form is shown", async ({ page }) => {
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test("5.18: Login succeeds with correct credentials", async ({ page }) => {
    await usernameInput.fill("user1");
    await passwordInput.fill("password1");
    await loginButton.click();

    await expect(page.getByTestId("successMsg")).toBeVisible();
  });

    test("5.19: Login fails with incorrect credentials", async ({ page }) => {
      await usernameInput.fill("wronguser");
      await passwordInput.fill("wrongpassword");
      await loginButton.click();

      await expect(page.getByTestId("errorMsg")).toBeVisible();
    });
});
