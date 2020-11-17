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

export const createNotification = (content, type) => {
  console.log(content);
  return {
    type: "NEW_NOTIFICATION",
    data: { content, type },
  };
};

export const deleteNotification = () => {
  return {
    type: "DELETE_NOTIFICATION",
  };
};

export default reducer;
