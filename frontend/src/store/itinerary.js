import jwtFetch from "./jwt";

export const RECEIVE_ITIN = "itins/RECEIVE_ITIN";
export const RECEIVE_ITINS = "itins/RECEIVE_ITINS";

export const recieveItin = (itin) => {
  return {
    type: RECEIVE_ITIN,
    itin,
  };
};

export const recieveItins = (itins) => {
  return {
    type: RECEIVE_ITINS,
    itins,
  };
};

export const getItins = (state) => {
  return state.itins ? Object.values(state.itins) : [];
};

export const getItin = (itinId) => (state) => {
  return state.itineraries ? state.itineraries[itinId] : null;
};

export const fetchItin = (itinId) => async dispatch => {
    const res = await jwtFetch(`api/itineraries/${itinId}`)

    if(res.ok) {
        const itin = await res.json()
        dispatch(recieveItin(itin))
    }
};
export const fetchItins = () => async dispatch => {
    const res = await jwtFetch(`api/itineraries`)

    if(res.ok) {
        const itins = await res.json()
        dispatch(recieveItins(itins))
    }
};



const itinReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_ITIN:
      nextState[action.itin.id] = action.itin;
      return nextState;
    case RECEIVE_ITINS:
        return {...action.itins}
    default:
      return state;
  }
};


export default itinReducer