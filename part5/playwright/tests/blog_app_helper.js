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

export { login };
