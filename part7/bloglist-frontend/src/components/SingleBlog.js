import { useDispatch } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer.js";
import React from "react";

const SingleBlog = ({ blog }) => {
  const dispatch = useDispatch();

  const like = () => {
    blog.likes += 1;
    dispatch(updateBlog(blog));
  };

  const deleteCurrent = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      <div>
        <div>
          <div>{blog.title} </div>
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

export default SingleBlog;
