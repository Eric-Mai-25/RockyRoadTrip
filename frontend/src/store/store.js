import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import errorsReducer from './errors';
import ui from './ui';
import routeSessionReducer from './routeSession';
import citiesReducer from './cities';
import itinReducer from './itinerary';
import { currentReviewReducer } from './reviews';
import reviewReducer from './reviews';
import itinSessionReducer from './itinSession';
import userReducer from './user';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  routePreview: routeSessionReducer,
  cities: citiesReducer,
  itineraries: itinReducer,
  itinSession: itinSessionReducer,
  reviews: reviewReducer,
  currentReview: currentReviewReducer,
  user: userReducer,
  ui: ui
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;