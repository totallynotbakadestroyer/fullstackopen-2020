import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer.js";

const BlogForm = () => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const [author, setBlogAuthor] = useState("");
  const [title, setBlogTitle] = useState("");
  const [url, setBlogUrl] = useState("");

  const dispatch = useDispatch();

  const createNew = (event) => {
    event.preventDefault();
    dispatch(createBlog({ author, title, url }));
    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
    setVisible(false);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className="toggleVisible"
          type="button"
          onClick={() => setVisible(true)}
        >
          new blog
        </button>
      </div>
      <div className="toggleableContent" style={showWhenVisible}>
        <h1>create new</h1>
        <form onSubmit={createNew}>
          <div>
            <label htmlFor="title">
              title
              <input
                onChange={({ target }) => setBlogTitle(target.value)}
                value={title}
                type="text"
                name="title"
                id="title"
              />
            </label>
          </div>
          <div>
            <label htmlFor="author">
              author
              <input
                value={author}
                onChange={({ target }) => setBlogAuthor(target.value)}
                type="text"
                name="author"
                id="author"
              />
            </label>
          </div>
          <div>
            <label htmlFor="url">
              url
              <input
                onChange={({ target }) => setBlogUrl(target.value)}
                value={url}
                type="text"
                name="url"
                id="url"
              />
            </label>
          </div>
          <div>
            <button type="submit">add new</button>
          </div>
        </form>
        <button
          className="closeVisible"
          type="button"
          onClick={() => setVisible(false)}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
