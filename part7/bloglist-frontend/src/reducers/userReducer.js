import loginService from "../services/login";
import { createNotification } from "./notificationReducer.js";

const userReducer = (state = null, action) => {
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

export const initUser = () => {
  return (dispatch) => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOGIN", data: user });
    }
  };
};

export default userReducer;
