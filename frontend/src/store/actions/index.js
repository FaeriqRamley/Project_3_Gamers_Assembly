export const addUser = (input) => {
  return {
    type: "updateUser",
    payload: input,
  };
};

export const addFriend = (input) => {
  return {
    type: "updateFriend",
    payload: input,
  };
};
export function UserDetails(input) {
  return {
    type: "UserDetails",
    payload: input,
  };
}
