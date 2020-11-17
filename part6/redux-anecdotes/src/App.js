import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm.js";
import AnecdoteList from "./components/AnecdoteList.js";
import Notification from "./components/Notification.js";
import Filter from "./components/Filter.js";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer.js";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  });
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
