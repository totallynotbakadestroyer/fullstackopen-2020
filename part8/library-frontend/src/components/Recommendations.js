import { FAVORITE_BOOKS, FAVORITE_GENRE } from "../queries.js";
import { useQuery } from "@apollo/client";
import React from "react";

const Recommendations = (props) => {
  const favoriteGenre = useQuery(FAVORITE_GENRE);

  if (!props.show || favoriteGenre.loading) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{favoriteGenre.data.me.favoriteGenre}</strong>
      </p>

      <RecommendationsList favoriteGenre={favoriteGenre.data.me.favoriteGenre} />
    </div>
  );
};

const RecommendationsList = (props) => {
  const books = useQuery(FAVORITE_BOOKS, {
    variables: { genre: props.favoriteGenre },
  });

  if (books.loading || !props.favoriteGenre) {
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
        {books.data.allBooks.map((a) => (
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

export default Recommendations;
