import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

console.log(token)

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: token },
  });
  return response.data;
};

export default { getAll, create, setToken };