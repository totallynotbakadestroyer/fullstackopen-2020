import loginService from "../services/login";
import { createNotification } from "./notificationReducer.js";
import blogService from "../services/blogs.js";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const login = (credentials) => {
  return (dispatch) => {
    loginService
      .login(credentials)
      .then((user) => dispatch({ type: "LOGIN", data: user }))
      .catch(() => {
        dispatch(createNotification("wrong credentials", "error"));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
};

export const initAuth = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", data: user });
      blogService.setToken(user.token);
    }
  };
};

export default authReducer;
