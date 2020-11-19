import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

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

const update = async (blog) => {
  const blogObject = Object.assign({}, blog, { creator: blog.creator.id });
  const response = await axios.put(`${baseUrl}/${blog.id}`, blogObject, {
    headers: { Authorization: token },
  });
  return response.data;
};

const deleteBlog = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: { Authorization: token },
  });
};

export default { getAll, create, setToken, update, deleteBlog };
