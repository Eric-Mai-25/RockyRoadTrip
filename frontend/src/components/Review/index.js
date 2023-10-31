import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { login, clearSessionErrors } from "../../store/session";
import { createReview } from "../../store/reviews";
import * as modalActions from "../../store/modal";
import { useParams } from "react-router-dom";

function ReviewForm() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const author = useSelector((state) => state.session);
  const itinId = useSelector((state) => state.itinSession);


  const handleSubmit = (e) => {

    const body = {
      rating: rating,
      comment: comment,
      author: author._id,
      itinerary: itinId,
    };
    dispatch(createReview(body)).then(() => {
      dispatch(modalActions.closeModal());
    });
  };



  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Comment:</label>
        </div>
        <div>
          <textarea type="" onChange={(e) => setComment(e.target.value)} />
        </div>
      </div>
      <div>
        <label>Rating:</label>
        <select className="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <input type="submit" value="Submit"></input>
    </form>
  );
}

export default ReviewForm;
