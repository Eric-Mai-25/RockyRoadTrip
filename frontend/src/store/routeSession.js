export const ADD_ROUTE = "routes/ADD_ROUTE";
export const CLEAR_ROUTE = "routes/CLEAR_ROUTE";

export const addRoute = (route) => {
  localStorage.setItem("routePreview", JSON.stringify(route))
  return {
    type: ADD_ROUTE,
    route,
  };
};

export const clearRoute = () => {
  localStorage.removeItem('routePreview')
  return {
    type: CLEAR_ROUTE,
  };
};

const routeSessionReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case ADD_ROUTE:
        nextState = action.route
      return nextState;
    case CLEAR_ROUTE:
      return {};
    default:
      return state;
  }
};

export default routeSessionReducer;
