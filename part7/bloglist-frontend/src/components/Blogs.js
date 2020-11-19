import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer.js";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const like = () => {
    blog.likes += 1;
    dispatch(updateBlog(blog));
  };

  const deleteCurrent = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button className="toggleVisible" onClick={() => setVisible(true)}>
            view
          </button>
        </div>
      </div>
      <div style={showWhenVisible} className="toggleableContent">
        <div style={blogStyle}>
          <div>
            {blog.title}{" "}
            <button className="toggleVisible" onClick={() => setVisible(false)}>
              hide
            </button>
          </div>
          <div>{blog.url}</div>
          <div className="likesCount">
            likes {blog.likes}{" "}
            <button className="toggleLike" onClick={like}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {localStorage.getItem("user") &&
          blog.creator.username ===
            JSON.parse(localStorage.getItem("user")).username ? (
            <button onClick={deleteCurrent}>delete</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
