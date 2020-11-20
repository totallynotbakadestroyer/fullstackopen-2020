import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm.js";
import Blogs from "./components/Blogs.js";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification.js";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer.js";
import { initAuth, logout } from "./reducers/authReducer.js";
import { Redirect, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Users from "./components/Users.js";
import SingleUser from "./components/SingleUser.js";
import { initUsers } from "./reducers/usersReducer.js";
import SingleBlog from "./components/SingleBlog.js";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const userById = (id) => users.find((a) => a.id === id);
  const blogById = (id) => blogs.find((a) => a.id === id);

  const userMatch = useRouteMatch("/users/:id");
  const blogMatch = useRouteMatch("/blogs/:id");

  const user = userMatch ? userById(userMatch.params.id) : null;
  const blog = blogMatch ? blogById(blogMatch.params.id) : null;

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initAuth());
    dispatch(initUsers());
  }, [dispatch]);

  if (!auth) {
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
      <h2>blogs</h2>
      <p>
        {auth.name} logged in{" "}
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>
      <Switch>
        <Route path={"/blogs/:id"}>
          <SingleBlog blog={blog} />
        </Route>
        <Route path={"/users/:id"}>
          <SingleUser user={user} />
        </Route>
        <Route path={"/users"}>
          <Users users={users} />
        </Route>
        <Route path={"/"}>
          <div>
            <Notification notification />
            <BlogForm />
          </div>
          <Blogs />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
