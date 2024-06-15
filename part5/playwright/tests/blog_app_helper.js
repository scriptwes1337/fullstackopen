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
  titleInput, title, authorInput, author, urlInput, url, createBlogBtn
) => {
  
    await titleInput.fill(title);
    await authorInput.fill(author);
    await urlInput.fill(url);
    await createBlogBtn.click();
}

export { login, createBlog };
