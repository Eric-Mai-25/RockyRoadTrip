import jwtFetch from "./jwt";

export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";

export const recieveReview = (review) => {
  return {
    type: RECEIVE_REVIEW,
    review,
  };
};

const getReview = (reviewId) => (state) => {
  return state.reviews ? state.reviews[reviewId] : null;
};

export const createReview = (review) => async (dispatch) => {
  const res = await jwtFetch(`/api/itineraries/${review.itinerary}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.ok) {
    const review = await res.json();
    dispatch(recieveReview(review));
  }
};

const reviewReducer = (state ={}, action) =>{
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_REVIEW:
            nextState[action.review._id] = action.review
            return nextState;
        default:
            return state;
    }
}

export default reviewReducer