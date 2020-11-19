import React from "react";
import { login } from "../reducers/userReducer.js";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      login({
        username: event.target.username.value,
        password: event.target.password.value,
      })
    );
    event.target.username.value = "";
    event.target.password.value = "";
  };
  return (
    <div>
      <form id="login" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">
            Username
            <input type="text" name="username" id="username" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <input type="password" name="password" id="password" />
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
