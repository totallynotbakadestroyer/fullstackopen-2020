import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const newPerson = (person) => {
  const request = axios.post(baseUrl, person);
  return request.then((response) => response.data);
};

const updatePerson = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then((response) => response.data);
};

const deletePerson = (person) => {
  return axios.delete(`${baseUrl}/${person.id}`);
};

export default { getAll, newPerson, deletePerson, updatePerson };
