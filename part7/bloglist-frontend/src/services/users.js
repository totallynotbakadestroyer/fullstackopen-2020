import axios from "axios";

const baseURL = "http://localhost:3001/api/users";

const getAll = async () => {
  const users = await axios.get(baseURL);
  return users.data;
};

export default { getAll };
