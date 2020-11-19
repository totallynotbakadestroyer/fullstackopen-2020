import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm.js";
import Blogs from "./components/Blogs.js";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification.js";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer.js";
import { initUser, logout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification notification />
        <p>
          {user.name} logged in{" "}
          <button onClick={() => dispatch(logout())}>logout</button>
        </p>
        <BlogForm />
      </div>
      <Blogs />
    </div>
  );
};

export default App;
