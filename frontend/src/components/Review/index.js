import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login, clearSessionErrors } from '../../store/session';
import { createReview } from '../../store/reviews';

function ReviewForm () {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const author = useSelector(state => state.session)
    const itinId = useSelector(state => Object.keys(state.itineraries))

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
        rating : 2,
        comment: "This route is crazy!",
        author: "653ade9d08199d10c60af069",
        itinerary: itinId[0]
    }
    dispatch(createReview(body))
  }

// rating
// 5
// comment
// "Ater combibo articulus volup."
// author
// 653ade9d08199d10c60af067
// itinerary
// 653ade9e08199d10c60af0a2

  return (
    <form className="session-form" onSubmit={handleSubmit}>
        <div>hi</div> 
        <input type='submit' value="Submit"></input>
    </form>
  );
}

export default ReviewForm;