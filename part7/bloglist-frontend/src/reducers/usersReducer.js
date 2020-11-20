import usersService from "../services/users.js";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    default:
      return state;
  }
};

export const initUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: "INIT_USERS",
      data: users,
    });
  };
};

export default reducer;
