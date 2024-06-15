const reset = async (request) => {
  return await request.post("/api/test/reset");
};

const createUser = async (request, username, name, password) => {
  return await request.post("/api/users/register", {
    data: {
      username,
      name,
      password,
    },
  });
};

const login = async (
  usernameElement,
  username,
  passwordElement,
  password,
  loginElement
) => {
  await usernameElement.fill(username);
  await passwordElement.fill(password);
  await loginElement.click();
};

const createBlog = async (
  titleInput,
  title,
  authorInput,
  author,
  urlInput,
  url,
  createBlogBtn
) => {
  await titleInput.fill(title);
  await authorInput.fill(author);
  await urlInput.fill(url);
  await createBlogBtn.click();
};

export { reset, createUser, login, createBlog };
