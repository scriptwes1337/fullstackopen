const { test, expect, beforeEach, describe } = require("@playwright/test");
import { createBlog, login } from "./blog_app_helper";

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

    const titleInput = await page.getByTestId("newBlogTitleInput");
    const authorInput = await page.getByTestId("newBlogAuthorInput");
    const urlInput = await page.getByTestId("newBlogUrlInput");
    const createBlogBtn = await page.getByTestId("newBlogCreateBtn");

    await createBlog(
      titleInput,
      "testBlog",
      authorInput,
      "testAuthor",
      urlInput,
      "testUrl",
      createBlogBtn
    );

    const blogEntry = await page.getByTestId("blogEntry");
    await blogEntry.waitFor();

    expect(blogEntry).toBeVisible();
  });

  test("5.20: Blog can be liked", async ({ page }) => {
    await login(
      usernameInput,
      "username",
      passwordInput,
      "password",
      loginButton
    );

    const newBlogBtn = await page.getByTestId("newBlogBtn");
    await newBlogBtn.click();

    const titleInput = await page.getByTestId("newBlogTitleInput");
    const authorInput = await page.getByTestId("newBlogAuthorInput");
    const urlInput = await page.getByTestId("newBlogUrlInput");
    const createBlogBtn = await page.getByTestId("newBlogCreateBtn");

    await createBlog(
      titleInput,
      "testBlog",
      authorInput,
      "testAuthor",
      urlInput,
      "testUrl",
      createBlogBtn
    );

    const toggleBlogDetailsBtn = await page.getByTestId("toggleBlogDetailsBtn");
    await toggleBlogDetailsBtn.click();

    const likeBtn = page.getByTestId("likeBtn");
    await likeBtn.click();

    const likeCount = await page.getByTestId("likeCount");
    await likeCount.waitFor();
    await expect(likeCount).toHaveText("Likes: 1");
  });

  test("5.21: User who added the blog can delete the blog", async ({
    page,
  }) => {
    await login(
      usernameInput,
      "username",
      passwordInput,
      "password",
      loginButton
    );

    const newBlogBtn = page.getByTestId("newBlogBtn");
    await newBlogBtn.click();

    const titleInput = await page.getByTestId("newBlogTitleInput");
    const authorInput = await page.getByTestId("newBlogAuthorInput");
    const urlInput = await page.getByTestId("newBlogUrlInput");
    const createBlogBtn = await page.getByTestId("newBlogCreateBtn");

    await createBlog(
      titleInput,
      "testBlog",
      authorInput,
      "testAuthor",
      urlInput,
      "testUrl",
      createBlogBtn
    );

    const toggleBlogDetailsBtn = await page.getByTestId("toggleBlogDetailsBtn");
    await toggleBlogDetailsBtn.click();

    const deleteBtn = await page.getByTestId("deleteBtn");
    await deleteBtn.click();

    const blogDetails = await page.getByTestId("blogDetails");
    await expect(blogDetails).not.toBeVisible();
  });
});
