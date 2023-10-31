export const ADD_ITIN= "itins/ADD_ITIN";
export const CLEAR_ITIN = "itins/CLEAR_ITIN";

export const addItin = (itin) => {
  localStorage.setItem("itinSession", JSON.stringify(itin))
  return {
    type: ADD_ITIN,
    itin,
  };
};

export const clearItin = () => {
  localStorage.removeItem('itinSession')
  return {
    type: CLEAR_ITIN,
  };
};

const itinSessionReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case ADD_ITIN:
        nextState = action.itin
      return nextState;
    case CLEAR_ITIN:
      return {};
    default:
      return state;
  }
};

export default itinSessionReducer