import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries.js";

const Books = (props) => {
  const books = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setGenres([
        ...new Set([
          ...data.allBooks.reduce(
            (array, book) => array.concat(book.genres),
            []
          ),
        ]),
      ]);
      console.log(genres);
    },
  });
  const [filterGenre, setFilterGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [booksToShow, setBooksToShow] = useState([]);

  useEffect(() => {
    console.log("effect")
    if (!books.loading) {
      setBooksToShow(
        filterGenre
          ? books.data.allBooks.filter((book) =>
              book.genres.some((genre) => genre === filterGenre)
            )
          : books.data.allBooks
      );
    }
  }, [books, filterGenre]);

  if (!props.show || books.loading) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      {filterGenre ? (
        <p>
          in genre <strong>{filterGenre}</strong>
        </p>
      ) : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button onClick={() => setFilterGenre(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilterGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
