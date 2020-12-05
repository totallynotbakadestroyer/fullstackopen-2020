import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient } from "@apollo/client";
import LoginForm from "./components/LoginForm.js";
import Recommendations from "./components/Recommendations.js";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = async () => {
    localStorage.clear();
    setToken(null);
    await client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
          </span>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm
        setPage={setPage}
        setToken={setToken}
        show={page === "login"}
      />

      <Recommendations show={page === "recommendations"} />
    </div>
  );
};

export default App;
