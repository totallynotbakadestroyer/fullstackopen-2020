import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer.js";
import { connect } from "react-redux";
import { createNotification } from "../reducers/notificationReducer.js";

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault();
    props.createAnecdote(event.target.anecdote.value);
    props.createNotification(event.target.anecdote.value, "NEW", 5);
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
const mapDispatchToProps = {
  createAnecdote,
  createNotification,
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  };
};

const connectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);
export default connectedAnecdotes;
