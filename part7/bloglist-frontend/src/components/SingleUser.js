import React from "react";

const SingleUser = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <p>{blog.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleUser;
