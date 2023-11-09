import jwtFetch from "./jwt";

export const RECEIVE_USER = "users/RECEIVE_USER";

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};

export const getUser = (userId) => (state) => {
  return state.users ? state.users[userId] : null;
};

export const fetchUser = (userId) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}`);
  if (res.ok) {
    const user = await res.json();
    dispatch(receiveUser(user));
  }
};

const userReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_USER:
      nextState[action.user._id] = action.user;
      return nextState;
    default:
      return state;
  }
};


export default userReducer