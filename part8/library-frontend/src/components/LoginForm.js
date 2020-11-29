import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries.js";

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("token", token);
      setPage("authors");
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor={"username"}>
            name
            <input
              onChange={({ target }) => setUsername(target.value)}
              id={"username"}
            />
          </label>
        </div>
        <div>
          <label htmlFor={"password"}>
            password
            <input
              type={"password"}
              onChange={({ target }) => setPassword(target.value)}
              id={"password"}
            />
          </label>
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
