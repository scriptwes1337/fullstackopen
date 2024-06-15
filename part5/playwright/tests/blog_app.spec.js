const { test, expect, beforeEach, describe } = require("@playwright/test");
import { createBlog, createUser, login, reset } from "./blog_app_helper";

describe("Blog app", () => {
  let usernameInput;
  let passwordInput;
  let loginButton;

  beforeEach(async ({ page, request }) => {
    await reset(request);
    await createUser(request, "username", "name", "password");
    await page.goto(`/`);
    usernameInput = await page.getByTestId("username");
    passwordInput = await page.getByTestId("password");
    loginButton = await page.getByTestId("loginBtn");
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

  test.describe("Blog functionality", () => {
    let newBlogBtn;
    let titleInput;
    let authorInput;
    let urlInput;
    let createBlogBtn;
    let blogEntry;
    let toggleBlogDetailsBtn;
    let logoutBtn;

    beforeEach(async ({ page }) => {
      await login(
        usernameInput,
        "username",
        passwordInput,
        "password",
        loginButton
      );

      logoutBtn = page.getByTestId("logoutBtn");

      newBlogBtn = await page.getByTestId("newBlogBtn");
      await newBlogBtn.click();

      titleInput = await page.getByTestId("newBlogTitleInput");
      authorInput = await page.getByTestId("newBlogAuthorInput");
      urlInput = await page.getByTestId("newBlogUrlInput");
      createBlogBtn = await page.getByTestId("newBlogCreateBtn");

      await createBlog(
        titleInput,
        "testBlog",
        authorInput,
        "testAuthor",
        urlInput,
        "testUrl",
        createBlogBtn
      );

      blogEntry = await page.getByTestId("blogEntry");
      toggleBlogDetailsBtn = await page.getByTestId("toggleBlogDetailsBtn");
    });

    test("5.19: A logged in user can create a blog", async () => {
      await blogEntry.waitFor();
      expect(blogEntry).toBeVisible();
    });

    test("5.20: Blog can be liked", async ({ page }) => {
      await toggleBlogDetailsBtn.click();
      await page.getByTestId("likeBtn").click();
      const likeCount = await page.getByTestId("likeCount");
      await likeCount.waitFor();
      await expect(likeCount).toHaveText("Likes: 1");
    });

    test("5.21: User who added the blog can delete it", async ({ page }) => {
      await toggleBlogDetailsBtn.click();
      await page.getByTestId("deleteBtn").click();
      const blogDetails = await page.getByTestId("blogDetails");
      await expect(blogDetails).not.toBeVisible();
    });

    test("5.22: Only the user who added the blog sees the blog's delete button", async ({
      page,
      request,
    }) => {
      await logoutBtn.click();
      await createUser(request, "username2", "name2", "password2");
      await login(
        usernameInput,
        "username2",
        passwordInput,
        "password2",
        loginButton
      );
      await toggleBlogDetailsBtn.click();
      await expect(page.getByTestId("deleteBtn")).not.toBeVisible();
    });

    test("5.23: Blogs are ordered according to likes", async ({ page }) => {
      // create second blog
      await newBlogBtn.click();
      await createBlog(
        titleInput,
        "testBlog2",
        authorInput,
        "testAuthor2",
        urlInput,
        "testUrl2",
        createBlogBtn
      );

      // open first blog and like
      await page
        .locator("button[data-testid='toggleBlogDetailsBtn']")
        .first()
        .click();
      await page.locator("button[data-testid='likeBtn']").first().click();

      // open second blog and like
      await page
        .locator("button[data-testid='toggleBlogDetailsBtn']")
        .last()
        .click();
      await page.locator("button[data-testid='likeBtn']").last().click();
      await page.locator("button[data-testid='likeBtn']").last().click();

      await page.reload();

      // Click on the "view" button of both blogs again
      await page
        .locator("button[data-testid='toggleBlogDetailsBtn']")
        .first()
        .click();
      await page
        .locator("button[data-testid='toggleBlogDetailsBtn']")
        .last()
        .click();

      // Assert that the blogs are sorted correctly
      await expect(
        page.locator("span[data-testid='likeCount']").first()
      ).toHaveText("Likes: 2");
      await expect(
        page.locator("span[data-testid='likeCount']").last()
      ).toHaveText("Likes: 1");
    });
  });
});
