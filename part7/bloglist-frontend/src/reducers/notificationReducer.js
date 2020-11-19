const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return { ...action.data };
    case "DELETE_NOTIFICATION":
      return {};
    default:
      return state;
  }
};

let timeoutObject;

export const createNotification = (content, type) => {
  clearTimeout(timeoutObject);
  return async (dispatch) => {
    dispatch({
      type: "NEW_NOTIFICATION",
      data: { content, type },
    });
    timeoutObject = setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
  };
};

const deleteNotification = () => {
  return {
    type: "DELETE_NOTIFICATION",
  };
};

export default notificationReducer;
