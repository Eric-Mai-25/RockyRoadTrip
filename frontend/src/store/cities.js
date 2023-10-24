import jwtFetch from "./jwt";

const RECIEVE_CITIES = "cities/RECIEVE_CITIES";

const receiveCities = (cities) => ({
  type: RECIEVE_CITIES,
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
    case RECIEVE_CITIES:
      return action.cities;
    default:
      return state;
  }
};

export default citiesReducer;
