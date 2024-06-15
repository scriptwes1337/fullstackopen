const { test, expect, beforeEach, describe } = require("@playwright/test");
import { login } from "./blog_app_helper";

describe("Blog app", () => {
  let usernameInput;
  let passwordInput;
  let loginButton;

  beforeEach(async ({ page, request }) => {
    await request.post(`/api/test/reset`);
    await request.post(`/api/users/register`, {
      data: {
        username: "username",
        name: "name",
        password: "password",
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
    await login(
      usernameInput,
      "username",
      passwordInput,
      "password",
      loginButton
    );
    await expect(page.getByTestId("successMsg")).toBeVisible();
  });

  test("5.18: Login fails with incorrect credentials", async ({ page }) => {
    await login(
      usernameInput,
      "wrong username",
      passwordInput,
      "wrong password",
      loginButton
    );
    await expect(page.getByTestId("errorMsg")).toBeVisible();
  });

  test("5.19: A logged in user can create a blog", async ({ page }) => {
    await login(
      usernameInput,
      "username",
      passwordInput,
      "password",
      loginButton
    );

    const newBlogBtn = page.getByTestId("newBlogBtn");
    await newBlogBtn.click();

    const titleInput = page.getByTestId("newBlogTitleInput");
    const authorInput = page.getByTestId("newBlogAuthorInput");
    const urlInput = page.getByTestId("newBlogUrlInput");
    const createBlogBtn = page.getByTestId("newBlogCreateBtn");

    await titleInput.fill("testBlog");
    await authorInput.fill("testAuthor");
    await urlInput.fill("testUrl");
    await createBlogBtn.click();

    const blogEntry = await page.getByTestId("blogEntry");
    await blogEntry.waitFor();

    expect(blogEntry).toBeVisible();
  });
});
