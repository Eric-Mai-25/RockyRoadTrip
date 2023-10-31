import jwtFetch from "./jwt";

export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW"

export const recieveReview = (review) => {
  return {
    type: RECEIVE_REVIEW,
    review,
  };
};

const getReview = (reviewId) => (state) => {
  return state.reviews ? state.reviews[reviewId] : null;
};

const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId,
  };
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

export const deleteReview = (reviewId, itinId) => async (dispatch) => {
  const res = await jwtFetch(
    `/api/itineraries/${itinId}/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (res.ok) {
    dispatch(removeReview(reviewId));
  }
};

const reviewReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_REVIEW:
      nextState[action.review._id] = action.review;
      return nextState;
    case REMOVE_REVIEW:
      delete nextState[action.reviewId];
      return nextState;
    default:
      return state;
  }
};

export default reviewReducer;
