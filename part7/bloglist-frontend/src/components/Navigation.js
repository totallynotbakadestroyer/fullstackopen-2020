import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../reducers/authReducer.js";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className={"navigation"}>
      <Link to={"/"}>blogs</Link>
      <Link to={"/users"}>users</Link>
      <span>{auth.name} logged in{" "}</span>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
};
export default Navigation;
