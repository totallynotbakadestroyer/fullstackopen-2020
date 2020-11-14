import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm.js";
import loginService from "./services/login.js";
import Blogs from "./components/Blogs.js";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification.js";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem("user"));
    if (userLogged) {
      setUser(userLogged);
      blogService.setToken(userLogged.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      setUser(user);
      blogService.setToken(user.token);
    } catch (e) {
      generateNotification("Wrong credentials", "error");
      console.log(user);
    }
  };

  const handleNewBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      generateNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        "success"
      );
    } catch (e) {
      console.log(e.error);
      generateNotification("Wrong blog info", "error");
    }
  };

  const handleUpdate = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog);
      const index = blogs.findIndex((x) => x.id === updatedBlog.id);
      const blogsCopy = [...blogs];
      blogsCopy[index] = updatedBlog;
      setBlogs(blogsCopy);
    } catch (e) {
      console.log(e.error);
    }
  };

  const handleDelete = async (blog) => {
    try {
      await blogService.deleteBlog(blog);
      const blogsCopy = [...blogs];
      blogsCopy.splice(
        blogsCopy.findIndex((x) => blog.id === x.id),
        1
      );
      setBlogs(blogsCopy);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const generateNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
          handlePassword={({ target }) => setPassword(target.value)}
          handleUsername={({ target }) => setUsername(target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <BlogForm handleNewBlog={handleNewBlog} />
      </div>
      <Blogs
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        blogs={blogs}
      />
    </div>
  );
};

export default App;
