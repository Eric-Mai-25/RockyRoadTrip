import jwtFetch from "./jwt";

const RECEIVE_CITIES = "cities/RECEIVE_CITIES";

const receiveCities = (cities) => ({
  type: RECEIVE_CITIES,
  cities,
});

export const fetchCities = () => async (dispatch) => {
  const res = await jwtFetch("/api/cities");

  if (res.ok) {
    const cities = await res.json();
    dispatch(receiveCities(cities));
  }
};

const citiesReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CITIES:
      return action.cities;
    default:
      return state;
  }
};

export default citiesReducer;
