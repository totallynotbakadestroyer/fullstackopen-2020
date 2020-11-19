import notificationReducer from "./reducers/notificationReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
