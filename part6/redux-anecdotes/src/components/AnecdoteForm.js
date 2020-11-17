import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer.js";
import { useDispatch } from "react-redux";
import {
  createNotification,
} from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.anecdote.value));
    dispatch(createNotification(event.target.anecdote.value, "NEW", 5));
    event.target.anecdote.value = "";
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;
