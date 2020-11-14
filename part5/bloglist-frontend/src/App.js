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
  const [author, setBlogAuthor] = useState("");
  const [title, setBlogTitle] = useState("");
  const [url, setBlogUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      generateNotification("Wrong credentials", "error");
      console.log(user);
    }
  };

  const handleNewBlog = async (event) => {
    try {
      event.preventDefault();
      const newBlog = await blogService.create({ author, title, url });
      setBlogs(blogs.concat(newBlog));
      generateNotification(`a new blog ${title} by ${author} added`, "success");
      setBlogUrl("");
      setBlogTitle("");
      setBlogAuthor("");
    } catch (e) {
      console.log(e.error)
      generateNotification("Wrong blog info", "error");
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
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleAuthor={({ target }) => setBlogAuthor(target.value)}
          handleUrl={({ target }) => setBlogUrl(target.value)}
          handleTitle={({ target }) => setBlogTitle(target.value)}
          handleNewBlog={handleNewBlog}
        />
      </div>
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;