const Anecdote = ({ anecdote, points }) => {
  return (
    <div>
      <div>{anecdote}</div>
      <p>has {points} votes</p>
    </div>
  );
};

export default Anecdote;
