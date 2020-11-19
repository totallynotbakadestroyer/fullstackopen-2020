import axios from "axios";
import blogService from "./blogs";

const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    localStorage.setItem("user", JSON.stringify(response.data));
    blogService.setToken(response.data.token);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export default { login };
