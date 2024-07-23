import React from "react";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";

export const Login = ({show, isLoggedIn, setIsLoggedIn}) => {
  if (!show) {
    return null;
  }

  if (isLoggedIn) {
    return <div>You are logged in</div>
  }

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      console.error("Error logging in:", error.message);
      alert(`Error logging in: ${error.message}`);
    },
    onCompleted: (data) => {
      console.log("Logged in successfully, your JWT is:", data);
      localStorage.setItem("token", data.login.value);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      login({
        variables: {
          username: e.target.loginUsername.value,
          password: e.target.loginPassword.value,
        },
      });
      setIsLoggedIn(true)
    } catch (error) {
      console.log("Error logging in", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="loginUsername">Username</label>
          <input type="text" name="loginUsername" id="loginUsername" />
        </div>
        <div>
          <label htmlFor="loginPassword">Password</label>
          <input type="text" name="loginPassword" id="loginPassword" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
