import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, CHANGE_BORN } from "../queries.js";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState(null);

  const [editAuthor] = useMutation(CHANGE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const changeBorn = async (event) => {
    event.preventDefault();
    console.log(name);
    await editAuthor({ variables: { name, setBornTo: born } });
  };

  if (!props.show || authors.loading) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <form onSubmit={changeBorn}>
          <h2>Set birthyear</h2>
          <div>
            <label for="author">
              name
              <select defaultChecked={""} onChange={(event) => setName(event.target.value)}>
                <option value="" selected disabled hidden>select name here</option>
                {authors.data.allAuthors.map((a, index) => {
                  return (
                    <option key={index} value={a.name}>
                      {a.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div>
            <label for="bornYear">
              born
              <input
                onChange={(event) => setBorn(Number(event.target.value))}
                name={"bornYear"}
                id={"bornYear"}
              />
            </label>
          </div>
          <div>
            <button>update author</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authors;
