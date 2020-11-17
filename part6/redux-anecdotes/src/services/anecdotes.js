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

export default { getAll, createNew };
