import React from "react";
import { Button, Form } from "react-bootstrap";

export const LoginForm = ({ handleUsername, handlePassword, handleLogin }) => {
  return (
    <>
      <h2>log in to application</h2>
      <Form>
        <Form.Label htmlFor="usernameLoginInput">username</Form.Label>
        <Form.Control
          type="text"
          name="usernameLoginInput"
          id="usernameLoginInput"
          onChange={handleUsername}
          data-testid="username"
        />
      </Form>
      <Form>
        <Form.Label htmlFor="passwordLoginInput">password</Form.Label>
        <Form.Control
          type="text"
          name="passwordLoginInput"
          id="passwordLoginInput"
          onChange={handlePassword}
          data-testid="password"
        />
      </Form>
        <Button onClick={handleLogin} data-testid="loginBtn" className="m-1">
          login
        </Button>
    </>
  );
};
