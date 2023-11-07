import jwtFetch from "./jwt";

export const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
export const CURRENT_REVIEW = "reviews/CURRENT_REVIEW";

export const receiveReviews = (reviews) => {
  return {
    type: RECEIVE_REVIEWS,
    reviews
  }
}

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

export const currentReview = (review) => {
  return {
    type: CURRENT_REVIEW,
    review
  }
}

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

export const updateReview = (review, itinId, reviewId) => async (dispatch) => {
  const res = await jwtFetch(`/api/itineraries/${itinId}/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(review),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  });

  if (res.ok) {
    const review = await res.json();
    dispatch(recieveReview(review));
  }
}

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

export const currentReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_REVIEW:
      return action.review;
    default:
      return state;
  }
}

const reviewReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_REVIEWS:
      return action.reviews;
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
