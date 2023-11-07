import jwtFetch from "./jwt";
import { receiveReviews } from "./reviews";

export const RECEIVE_ITIN = "itineraries/RECEIVE_ITIN";
export const RECEIVE_ITINS = "itineraries/RECEIVE_ITINS";
export const UPDATE_ITIN = "itineraries/UPDATE_ITIN";

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

export const updateItin = (payload) => {
  return {
    type: UPDATE_ITIN,
    payload
  }
}

export const getItins = (state) => {
  return state.itineraries ? Object.values(state.itineraries) : [];
};

export const getItin = (itinId) => (state) => {
  return state.itineraries ? state.itineraries[itinId] : null;
};

export const fetchItin = (itinId) => async dispatch => {
    const res = await jwtFetch(`/api/itineraries/${itinId}`)
    if(res.ok) {
        const itin = await res.json()
        dispatch(recieveItin(itin))
        dispatch(receiveReviews(itin.reviews || []))
    }
};
export const fetchItins = () => async dispatch => {
    const res = await jwtFetch(`/api/itineraries`)

    if(res.ok) {
        const itins = await res.json()
        dispatch(recieveItins(itins))
    }
};

export const createItinerary = (itinerary) => {
  return async(dispatch) => {
      const res = await jwtFetch("/api/itineraries", {
          method: 'POST',
          body: JSON.stringify(itinerary)
      })

      if (res.ok){
        const data = await res.json();
        dispatch(recieveItin(data));
        return data;
      }
  }
}

export const updateItinerary = (itineraryId, itinMiddleCities) => {
  return async(dispatch) => {
    const res = await jwtFetch(`/api/itineraries/${itineraryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({middleCities: itinMiddleCities})
    });
    if(res.ok){
      const data = await res.json();
      console.log("data: ", data)
      dispatch(updateItin({ itinId: itineraryId, itin: itinMiddleCities }));
    }else{
      const errorMessage = await res.json();
      console.error("Failed to update Itinerary", errorMessage.message || "Unknown Error");
    }
  }
}

const itinReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_ITIN:
      nextState[action.itin._id] = action.itin;
      return nextState ;
    case RECEIVE_ITINS:
        return {...action.itins}
    case UPDATE_ITIN:
      console.log("action.payload", action.payload)
      const {itinId, itin} = action.payload;
      const existingItin = nextState[itinId];
      if(existingItin) {
        nextState[itinId] = {
          ...existingItin, middleCities: itin.middleCities
        }
      } else {
        nextState[itinId] = itin;
      }
      return nextState;
    default:
      return state;
  }
};


export default itinReducer