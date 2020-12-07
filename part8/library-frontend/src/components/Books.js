import React, { useEffect, useState } from "react";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries.js";

const Books = (props) => {
  const [genres, setGenres] = useState([]);

  const [filterGenre, setFilterGenre] = useState("");

  const [getBooks, { data }] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: filterGenre },
    onCompleted: ({ allBooks }) => {
      const booksGenres = [
        ...new Set([
          ...allBooks.reduce((array, book) => array.concat(book.genres), []),
        ]),
      ];
      console.log(genres.length, booksGenres.length);
      if (genres.length < booksGenres.length) {
        setGenres(booksGenres);
      }
    },
  });

  useEffect(() => {
    getBooks();
  }, [filterGenre, getBooks]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: () => {
      getBooks();
    },
  });

  if (!props.show || !data) {
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

      <BooksList books={data.allBooks} />
      <FilterButtons genres={genres} setFilterGenre={setFilterGenre} />
    </div>
  );
};

const BooksList = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const FilterButtons = ({ genres, setFilterGenre }) => {
  return (
    <div>
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
