import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_GENRES, BOOKS_BY_GENRE } from "../queries.js";

const Books = (props) => {
  const genres = useQuery(ALL_GENRES);

  const [filterGenre, setFilterGenre] = useState("");

  if (!props.show || genres.loading) {
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

      <BooksList filterGenre={filterGenre} />
      <FilterButtons
        genres={genres.data.allGenres}
        setFilterGenre={setFilterGenre}
      />
    </div>
  );
};

const BooksList = ({ filterGenre }) => {
  const [getBooks, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE, {
    variables: { genre: filterGenre },
  });

  useEffect(() => {
    getBooks();
  }, [filterGenre, getBooks]);

  if (loading || !data) {
    return null;
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {data.allBooks.map((a) => (
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
