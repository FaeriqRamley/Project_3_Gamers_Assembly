const userReducer = (state = "no users", action) => {
  switch (action.type) {
    case "userDetails":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
