import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useSubscription } from "@apollo/client";
import LoginForm from "./components/LoginForm.js";
import Recommendations from "./components/Recommendations.js";
import { ALL_BOOKS, BOOK_ADDED } from "./queries.js";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) =>
      set.map((p) => p.title).includes(object.title);

    const dataInStore = client.readQuery({
      query: ALL_BOOKS,
      variables: { genre: "" },
    });
    console.log(dataInStore);
    console.log(includedIn(dataInStore.allBooks, addedPerson));
    if (!includedIn(dataInStore.allBooks, addedPerson)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: "" },
        data: { allBooks: dataInStore.allBooks.concat(addedPerson) },
      });
    }
    console.log(dataInStore);
  };

  const logout = async () => {
    localStorage.clear();
    setToken(null);
    await client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateCacheWith(subscriptionData.data.bookAdded);
      window.alert(
        `New book ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name} was added`
      );
    },
  });

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
