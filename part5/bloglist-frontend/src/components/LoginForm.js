import React from "react";

const LoginForm = ({ handleLogin, handleUsername, handlePassword }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">
            Username
            <input
              onChange={handleUsername}
              type="text"
              name="username"
              id="username"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <input
              onChange={handlePassword}
              type="password"
              name="password"
              id="password"
            />
          </label>
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
