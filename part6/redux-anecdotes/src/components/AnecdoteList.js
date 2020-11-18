import React from "react";
import { connect } from "react-redux";
import { createNotification } from "../reducers/notificationReducer.js";
import { updateAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = (props) => {
  console.log(props.anecdotes);
  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <Anecdote updateAnecdote={props.updateAnecdote} createNotification={props.createNotification} key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

const Anecdote = ({ anecdote, updateAnecdote, createNotification }) => {
  const vote = () => {
    updateAnecdote(anecdote);
    createNotification(anecdote.content, "NEW", 5);
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

const mapStateToProps = (state) => {
  if (state.filter !== "") {
    return {
      anecdotes: state.anecdotes.filter((x) =>
        x.content
          .split(" ")
          .some((word) => word.toLowerCase().startsWith(state.filter))
      ),
    };
  } else {
    return { anecdotes: state.anecdotes };
  }
};

const mapDispatchToProps = {
  updateAnecdote,
  createNotification,
};

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default connectedAnecdotes;
