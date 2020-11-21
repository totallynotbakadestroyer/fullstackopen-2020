import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer.js";
import React from "react";
import Comments from "./Comments.js";

const SingleBlog = ({ blog }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const like = () => {
    blog.likes += 1;
    dispatch(updateBlog(blog));
  };

  const isUser = () => blog.creator.username === auth.username;

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
          <h1>{blog.title} </h1>
          <a href={blog.url}>{blog.url}</a>
          <div className="likesCount">
            likes {blog.likes}{" "}
            <button className="toggleLike" onClick={like}>
              like
            </button>
          </div>
          <div>added by {blog.author}</div>
          {isUser() ? <button onClick={deleteCurrent}>delete</button> : null}
        </div>
        <Comments blog={blog} />
      </div>
    </div>
  );
};

export default SingleBlog;
