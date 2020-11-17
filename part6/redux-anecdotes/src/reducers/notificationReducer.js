const reducer = (state = {}, action) => {
  let stateCopy = { ...state };
  console.log(action);
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return {
        ...action.data,
      };
    case "DELETE_NOTIFICATION":
      return {};
    default:
      return stateCopy;
  }
};

export const createNotification = (content, type, timeout) => {
  console.log(content);
  return async (dispatch) => {
    dispatch({
      type: "NEW_NOTIFICATION",
      data: { content, type },
    });
    setTimeout(() => {
      dispatch(deleteNotification());
    }, timeout * 1000);
  };
};

export const deleteNotification = () => {
  return {
    type: "DELETE_NOTIFICATION",
  };
};

export default reducer;
