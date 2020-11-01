import React, { useState } from "react";
import ReactDOM from "react-dom";
import Anecdote from "./components/Anecdote.js";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length - 1).fill(0));

  const getRandom = () => {
    let random = Math.floor(Math.random() * Math.floor(anecdotes.length - 1));
    while (random === selected) {
      random = Math.floor(Math.random() * Math.floor(anecdotes.length - 1));
    }
    setSelected(random);
  };

  const getMax = () => {
    return points.indexOf(Math.max(...points));
  };

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
        <button onClick={() => vote()}>vote</button>
        <button onClick={() => getRandom()}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdotes[getMax()]} points={points[getMax()]} />
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
