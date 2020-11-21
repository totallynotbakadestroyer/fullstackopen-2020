import blogsService from "../services/blogs";
import { createNotification } from "./notificationReducer.js";

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_BLOG":
      return state.concat(action.data);
    case "INITIALIZE_BLOGS":
      return action.data;
    case "UPDATE_BLOG":
      return state.map((x) => {
        if (x.id === action.data.id) {
          return Object.assign({}, x, { ...action.data });
        }
        return x;
      });
    case "DELETE_BLOG":
      return state.filter((x) => x.id !== action.data.id);
    default:
      return state;
  }
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const blogObject = await blogsService.create(blog);
    dispatch({ type: "CREATE_BLOG", data: blogObject });
    dispatch(
      createNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        "success"
      )
    );
  };
};

  export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch({ type: "INITIALIZE_BLOGS", data: blogs });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(blog);
    dispatch({ type: "DELETE_BLOG", data: blog });
  };
};

export const updateBlog = (blog, comment) => {
  return async (dispatch) => {
    let blogObject;
    if(!comment) {
      blogObject = await blogsService.update(blog);
    }
    else {
      blogObject = await blogsService.comment(blog, comment);
    }
    dispatch({ type: "UPDATE_BLOG", data: blogObject });
  };
};

export default blogsReducer;
