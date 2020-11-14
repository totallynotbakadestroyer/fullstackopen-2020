import React, { useState } from "react";

const Blogs = ({ blogs, handleUpdate }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog handleUpdate={handleUpdate} key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const Blog = ({ blog, handleUpdate }) => {
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

  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(true)}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          <div>{blog.title}</div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={like}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
