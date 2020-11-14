import axios from "axios";

const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export default { login };
