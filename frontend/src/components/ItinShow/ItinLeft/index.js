import "./itinLeft.css";
import { AiFillStar, AiOutlineCaretDown } from "react-icons/ai";
import { CgArrowLongDownC } from "react-icons/cg";
import { BiSolidFlag, BiTestTube } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import * as modalActions from "../../../store/modal";
import { addItin } from "../../../store/itinSession";
import { addRoute } from "../../../store/routeSession";
import {deleteReview} from "../../../store/reviews"
import { Link } from "react-router-dom/cjs/react-router-dom";
import {AiFillCloseSquare} from "react-icons/ai"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ItinLeft({ itin, cities }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const middle = itin.middleCities.map((currCity) => currCity.city);
  const itinStartToFin = [itin.startCity, ...middle, itin.endCity];


  let itinReview;
  let itinEdit;

  const handleComment= e=>{
    dispatch(addItin(itin._id))
    dispatch(modalActions.openModal("createReview"))
  }

  const handleLogin = e =>{
    dispatch(modalActions.openModal("login"))
  }

  const handleCopy = e =>{
    
    
    dispatch(addRoute(itin))
  }

  const handleDelete = reviewId => e =>{
    dispatch(deleteReview(reviewId , itin._id));
    window.location.reload();
  }

  if (user) {
    itinReview = (
      <div className="review-create-button">
        <button
          onClick={handleComment}
        >
          Write a Comment
        </button>
      </div>
    );
    if (itin.author._id === user._id) {
      itinEdit = (
        <div className="review-edit-button">
          <NavLink to={`/edit/${itin._id}`}>
            <button onClick={() => {}}>Edit</button>
          </NavLink>
        </div>
      );
    } else {
      itinEdit = (
        <Link to={"/show"}>
        <div className="review-edit-button">
          <button onClick={handleCopy}>Copy</button>
        </div>
        </Link>
      );
    }
  } else {
    itinReview = (
      <div className="review-create-button">
        <button onClick={handleLogin}
        >
          Login to comment
        </button>
      </div>
    );
    itinEdit = (
      <div className="review-edit-button">
        <button onClick={() => {}}>Copy</button>
      </div>
    );
  }

  return (
    <>
      <div className="itin-titler">
        <h2 className="itin-title">{itin.name}</h2>
        {itinEdit}
      </div>
      <div className="route-box">
        <div className="route-content">
          <h2 className="route-name">On this route</h2>
          <div className="route-marker">
            {itinStartToFin.map((city, i) => {
              city = cities[city];
              return (
                <>
                  {i === 0 ? null : (
                    <hr color="#86bbd8" className="route-line"></hr>
                  )}
                  <div className="route-line-content">
                    <ul class="map-markers route-dot">
                      <li class="map-marker route-map-marker">
                        <a href="#">{city.name}</a>
                      </li>
                    </ul>
                    <h2 className="route-city-name">{city.name}</h2>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div>
      <div className="middle-route">
        <h2>{cities[itin.startCity].name}</h2>
        <CgArrowLongDownC className="down-arrow arrow" size={"50px"} />
        {itin.middleCities.map((cityData, i) => {
          const city = cities[cityData.city];
          return (
            <>
              <div>
                <h2>{city.name}</h2>
              </div>
              <div>
                <h3>What you will do</h3>
                <div className="data-box">
                  {cityData.activities.map((activities) => {
                    return (
                      <>
                        <div className="itin-data-info">
                          <div>
                            <img
                              className="data-img"
                              src={activities.imageUrl}
                            ></img>
                          </div>
                          <div className="data-words">
                            <h4>{activities.name}</h4>
                            <p>
                              <AiFillStar color={"#f6ae2d"} />
                              {activities.rating} rating
                            </p>
                            <p>{activities.reviewCount} reviews</p>
                            <p>{activities.displayAddress[0]}</p>
                            <p>{activities.displayAddress[1]}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3>Where you will stay</h3>
                <div className="data-box">
                  {cityData.hotels.map((hotels) => {
                    return (
                      <>
                        <div className="itin-data-info">
                          <div>
                            <img
                              className="data-img"
                              src={hotels.imageUrl}
                            ></img>
                          </div>
                          <div className="data-words">
                            <h4 className="itin-card-title">{hotels.name}</h4>
                            <p>
                              <AiFillStar color={"#f6ae2d"} />
                              {hotels.rating} rating
                            </p>
                            <p>{hotels.reviewCount} reviews</p>
                            <p>{hotels.displayAddress[0]}</p>
                            <p>{hotels.displayAddress[1]}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3>Where you will eat</h3>
                <div className="data-box">
                  {cityData.food.map((food) => {
                    return (
                      <>
                        <div className="itin-data-info">
                          <div>
                            <img className="data-img" src={food.imageUrl}></img>
                          </div>
                          <div className="data-words">
                            <h4>{food.name}</h4>
                            <p>
                              <AiFillStar color={"#f6ae2d"} />
                              {food.rating} rating
                            </p>
                            <p>{food.reviewCount} reviews</p>
                            <p>{food.displayAddress[0]}</p>
                            <p>{food.displayAddress[1]}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <CgArrowLongDownC className="down-arrow arrow" size={"50px"} />
            </>
          );
        })}
        <h2>{cities[itin.endCity].name}</h2>
        <BiSolidFlag
          className="down-arrow flag"
          size={"50px"}
          color="#f6ae2d"
        />
      </div>
      <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div>
      <div className="middle-route">
        <div className="data-box">
          {itin.reviews &&
            itin.reviews.map((review) => {
              return (
                <>
                  <div className="itin-data-info">
                    <div>
                  {user && user._id === review.author ? (<>
                    <AiFillCloseSquare onClick={handleDelete(review._id)} className="close-review-button" size={"20px"} />
                  </>): null}
                    </div>
                    <div>
                      <img
                        className="prof-img"
                        src={"https://xsgames.co/randomusers/avatar.php?g=male"}
                      ></img>
                    </div>
                    <div className="data-review-words">
                      <p>{review.comment}</p>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        {itinReview}
      </div>
    </>
  );
}

export default ItinLeft;
