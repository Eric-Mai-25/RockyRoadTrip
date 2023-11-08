import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateReview, createReview } from "../../store/reviews";
import * as modalActions from "../../store/modal";

function ReviewForm({update=false}) {
  const dispatch = useDispatch();
  const currentReview = useSelector((state) => state.currentReview);
  const [comment, setComment] = useState(update ? currentReview.comment : "");
  const [rating, setRating] = useState(update ? currentReview.rating: 1);
  const author = useSelector((state) => state.session);
  const itinId = useSelector((state) => state.itinSession);

  const handleSubmit = (e) => {
    const body = {
      rating: rating,
      comment: comment,
      author: author._id,
      itinerary: itinId,
    };
    if (update){
      dispatch(updateReview(body, currentReview.itinerary, currentReview._id)).then(() => {
        dispatch(modalActions.closeModal());
      });
    } else {
      dispatch(createReview(body)).then(() => {
        dispatch(modalActions.closeModal());
      });
    }
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Comment:</label>
        </div>
        <div>
          <textarea type="" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
      </div>
      <div>
        <label>Rating:</label>
        <select className="rating" value={rating} onChange={(e) => {setRating(parseInt(e.target.value))}}>
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
