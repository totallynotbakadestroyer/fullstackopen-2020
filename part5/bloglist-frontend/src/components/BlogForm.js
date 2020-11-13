import React from "react";

const BlogForm = (props) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={props.handleNewBlog}>
        <div>
          <label htmlFor="title">
            title
            <input
              onChange={props.handleTitle}
              value={props.title}
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
              value={props.author}
              onChange={props.handleAuthor}
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
              onChange={props.handleUrl}
              value={props.url}
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
    </div>
  );
};

export default BlogForm;
