import notificationReducer from "./reducers/notificationReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import blogsReducer from "./reducers/blogsReducer";
import authReducer from "./reducers/authReducer.js";
import usersReducer from "./reducers/usersReducer.js";

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogsReducer,
  auth: authReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
