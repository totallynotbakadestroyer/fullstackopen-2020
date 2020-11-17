import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNotification,
} from "../reducers/notificationReducer.js";
import { updateAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    if (filter !== "") {
      return state.anecdotes.filter((x) =>
        x.content
          .split(" ")
          .some((word) => word.toLowerCase().startsWith(filter))
      );
    } else {
      return state.anecdotes;
    }
  });
  console.log(anecdotes);
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = () => {
    dispatch(updateAnecdote(anecdote));
    dispatch(createNotification(anecdote.content, "NEW", 5));
  };
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote()}>vote</button>
      </div>
    </div>
  );
};

export default AnecdoteList;
