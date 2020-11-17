import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createNew = async (content) => {
  console.log(content);
  const response = await axios.post(baseURL, { content, votes: 0 });
  return response.data;
};

const update = async (anecdote) => {
  const response = await axios.put(`${baseURL}/${anecdote.id}`, {
    ...anecdote,
    votes: (anecdote.votes += 1),
  });
  return response.data;
};

export default { getAll, createNew, update };
