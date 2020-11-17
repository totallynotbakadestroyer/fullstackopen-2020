export const createAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    data: anecdote,
  };
};

const sortedState = (state) => {
  return [...state].sort((x, y) => y.votes - x.votes);
};

export const initializeAnecdotes = (anecdotesList) => {
  return {
    type: "INIT_ANECDOTES",
    data: [...anecdotesList],
  };
};

const reducer = (state = [], action) => {
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
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
