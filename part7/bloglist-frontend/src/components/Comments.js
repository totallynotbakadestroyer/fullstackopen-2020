import { updateBlog } from "../reducers/blogsReducer.js";
import React from "react";
import { useDispatch } from "react-redux";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();

  const addComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    dispatch(updateBlog(blog, comment));
    event.target.comment.value = "";
  };

  return (
    <div>
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <input name={"comment"} />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
