import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer.js";
import { useDispatch } from "react-redux";
import {
  createNotification,
  deleteNotification,
} from "../reducers/notificationReducer.js";
import anecdoteService from "../services/anecdotes.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = await anecdoteService.createNew(
      event.target.anecdote.value
    );
    dispatch(createAnecdote(anecdote));
    dispatch(createNotification(anecdote.content, "NEW"));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
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
