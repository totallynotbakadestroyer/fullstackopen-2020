import anecdoteService from "../services/anecdotes.js";

const sortedState = (state) => {
  return [...state].sort((x, y) => y.votes - x.votes);
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteObject = await anecdoteService.createNew(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      data: anecdoteObject,
    });
  };
};

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteObject = await anecdoteService.update(anecdote);
    dispatch({
      type: "VOTE",
      data: anecdoteObject,
    });
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  let stateCopy = [...state];

  switch (action.type) {
    case "VOTE":
      const index = stateCopy.findIndex((x) => x.id === action.data.id);
      stateCopy[index] = action.data;
      return sortedState(stateCopy);
    case "NEW_ANECDOTE":
      stateCopy = stateCopy.concat(action.data);
      return sortedState(stateCopy);
    case "INIT_ANECDOTES":
      return sortedState(action.data);
    default:
      return state;
  }
};

export default reducer;
