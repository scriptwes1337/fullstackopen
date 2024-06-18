import React from "react";

export const LoginForm = ({ handleUsername, handlePassword, handleLogin }) => {
  return (
    <>
      <h2>log in to application</h2>
      <div>
        <label htmlFor="usernameLoginInput">username</label>
        <input
          type="text"
          name="usernameLoginInput"
          id="usernameLoginInput"
          onChange={handleUsername}
          data-testid="username"
        />
      </div>
      <div>
        <label htmlFor="passwordLoginInput">password</label>
        <input
          type="text"
          name="passwordLoginInput"
          id="passwordLoginInput"
          onChange={handlePassword}
          data-testid="password"
        />
      </div>
      <div>
        <button onClick={handleLogin} data-testid="loginBtn">
          login
        </button>
      </div>
    </>
  );
};
