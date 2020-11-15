const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    data: asObject(content),
  };
};

const sortedState = (state) => {
  return [...state].sort((x, y) => y.votes - x.votes);
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  let stateCopy = [...state];

  switch (action.type) {
    case "VOTE":
      stateCopy.find((x) => x.id === action.data).votes += 1;
      return sortedState(stateCopy);
    case "NEW_ANECDOTE":
      stateCopy = stateCopy.concat(action.data);
      return sortedState(stateCopy);
    default:
      return state;
  }
};

export default reducer;
