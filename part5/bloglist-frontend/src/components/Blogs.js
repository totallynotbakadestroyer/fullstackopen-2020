import React, { useState } from "react";

const Blogs = ({ blogs, handleUpdate, handleDelete }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const like = () => {
    blog.likes += 1;
    handleUpdate(blog);
  };

  const deleteCurrent = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog);
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
          <div>{blog.title}</div>
          <div>{blog.url}</div>
          <div className="likesCount">
            likes {blog.likes} <button className="toggleLike" onClick={like}>like</button>
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
