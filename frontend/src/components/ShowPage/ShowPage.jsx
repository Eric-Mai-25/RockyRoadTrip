import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ShowPage.css";
import { addRoute } from "../../store/routeSession";
import * as itinerariesAction from "../../store/itinerary";
import * as modalActions from "../../store/modal";
import { useHistory } from "react-router-dom";
import { AiOutlineEdit, AiFillStar, AiFillCloseSquare } from "react-icons/ai";
import { BsYelp } from "react-icons/bs";

export const ShowPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState(""); // Store the name of the city the user is currenlty interactring with.
  const [selectedCategory, setSelectedCategory] = useState(""); // Store the currenlty selected category
  const [yelpResults, setYelpResults] = useState([]); //Will store the list of results fetched from the yelp API
  const [itineraryName, setItineraryName] = useState("");
  const [errors, setErrors] = useState([]);
  const cities = useSelector(state => state.cities)

  const sessionUser = useSelector((state) => state.session.user);
  const routePreview = useSelector((state) => state.routePreview);

  useEffect(() => {
    console.log(routePreview)
    let lsRoute = JSON.parse(localStorage.getItem("routePreview")) || {};
    if (!Object.keys(routePreview).length && lsRoute) {
      dispatch(addRoute(lsRoute));
    }
    console.log(lsRoute)
    if (lsRoute.middleCities.length) {
      setSelectedCity(lsRoute.middleCities[0].name);
      setSelectedCategory("activity");
    }
  }, []);

  const handleCategoryClick = (city, category) => (e) => {
    setSelectedCity(city);
    setSelectedCategory(category);
  };

  const fetchYelpData = async () => {
    try {
      const response = await fetch(
        `/api/yelp/searchYelp?location=${selectedCity}&term=${selectedCategory}&limit=5`
      );
      const data = await response.json();
      setYelpResults(data.businesses);
    } catch (error) {
      console.error("Error fetching Yelp data:", error);
    }
  };

  useEffect(() => {
    if (selectedCity && selectedCategory) {
      fetchYelpData();
    }
  }, [selectedCity, selectedCategory]);

  const handleUpdateMiddleCities = (selectedRes) => {
    let routePreviewCopy = { ...routePreview };

    routePreviewCopy.middleCities.forEach((middleCity) => {
      if (!middleCity.city) {
        middleCity.city = middleCity._id;
      }
      if (middleCity.name !== selectedCity) {
        return;
      }

      let objToInsert = {
        name: selectedRes.name,
        imageUrl: selectedRes.image_url,
        rating: selectedRes.rating,
        reviewCount: selectedRes.review_count,
        title: selectedRes.categories[0].title,
        displayAddress: selectedRes.location.display_address,
        busineesId: selectedRes.id,
      };

      switch (selectedCategory) {
        case "activity":
          let activities = middleCity.activities || [];
          activities.push(objToInsert);
          middleCity.activities = activities;
          break;
        case "hotel":
          let hotels = middleCity.hotels || [];
          hotels.push(objToInsert);
          middleCity.hotels = hotels;
          break;
        case "food":
          let food = middleCity.food || [];
          food.push(objToInsert);
          middleCity.food = food;
          break;
      }
    });
    dispatch(addRoute(routePreviewCopy));
  };

  const handleCreateItinerary = () => {
    let itineraryObj = { name: itineraryName };

    itineraryObj.startCity = routePreview.startCity._id;
    itineraryObj.endCity = routePreview.endCity._id;
    itineraryObj.middleCities = [];

    routePreview.middleCities.forEach((middleCity) => {
      let midCity = {};
      midCity.city = middleCity._id;
      midCity.activities = middleCity.activities || [];
      midCity.hotels = middleCity.hotels || [];
      midCity.food = middleCity.food || [];
      itineraryObj.middleCities.push(midCity);
    });

    dispatch(itinerariesAction.createItinerary(itineraryObj))
      .then((data) => {
        history.push(`/itinerary/${data._id}`);
      })
      .catch(async (res) => {
        let data;
        try {
          data = await res.json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }

        if (data?.errors) {
          let errs = [];
          Object.entries(data.errors).forEach(([key, value]) => {
            if (key === "name") {
              errs.push(`Invalid Name`);
            } else {
              errs.push(value);
            }
          });
          setErrors(errs);
        } else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  let plural;

  switch (selectedCategory) {
    case "activity":
      plural = "Activities";
      break;
    case "hotel":
      plural = "Hotels";
      break;
    case "food":
      plural = "resturants";
      break;
    default:
      break;
  }

  const handleDelete= (searchInd, deleteInd, array, section) => (e)=>{
    const updated = array.splice(deleteInd, 1)
    let routePreviewCopy = { ...routePreview }
    switch (section) {
        case "activity":
            routePreviewCopy.middleCities[searchInd].activities = array
            break;
        case "hotel":
            routePreviewCopy.middleCities[searchInd].hotels = array
            break;
        case "food":
            routePreviewCopy.middleCities[searchInd].food = array
            break;
        default:
            break;
    }

    dispatch(addRoute(routePreviewCopy))
  }

  return (
    Object.keys(routePreview).length && (
      <>
        <div className="outer-show-div">
          <div className="all-cities-div">
            {errors.map((error) => (
              <div>{error}</div>
            ))}
            <div className="itinerary-title">
              <h2>Title your journey!</h2>
              <div className="title-input-box">
                <input
                  className="title-input"
                  type="text"
                  value={itineraryName}
                  onChange={(e) => setItineraryName(e.target.value)}
                  placeholder="Add Title"
                ></input>
                <AiOutlineEdit
                  className="edit-icon"
                  size={"30px"}
                  color="white"
                />
              </div>
            </div>
            <div className="line">
              <hr color="#86bbd8" className="login-line"></hr>
            </div>
            <div className="city-div-start-end">
              <div className="city-title-div-start-end">
                <h2 className="city-title">{routePreview.startCity.name}</h2>
              </div>
            </div>
            {routePreview.middleCities.map((city, i) => (
              <div className="city-div" key={city._id}>
                <div className="city-title-div">
                  <h2 className="city-title">{city.name}</h2>
                </div>
                <div className="city-collection">
                  <div className="tabs">
                    {/* <div
                        onClick={handleCategoryClick(city.name, "activity")}
                      className="activites-div"
                    > */}
                    <input
                      name="tabs"
                      type="radio"
                      id={`${city._id}-1`}
                      className="input"
                      onClick={handleCategoryClick(city.name, "activity")}
                    />
                    <label for={`${city._id}-1`} className="label">
                      My activity
                    </label>
                    <div className="panel">
                      {/* <h3>What would you like to do?</h3> */}
                      <div className="collection-cards">
                        {routePreview.middleCities[i].activities ? (
                          routePreview.middleCities[i].activities.map(
                            (activities, j) => {
                              return (
                                <div className="itin-data-info show-itin-data">
                                
                                  <AiFillCloseSquare onClick={handleDelete(i, j, routePreview.middleCities[i].activities, "activity")} className="close-card" size={"30px"} />
                                  <div>
                                    <img
                                      className="data-img"
                                      src={activities.imageUrl}
                                    ></img>
                                  </div>
                                  <div className="data-words">
                                    <div className="title-and-x">
                                      <h4 className="data-card-title">
                                        {activities.name}
                                      </h4>
                                    </div>
                                    <p>
                                      <AiFillStar color={"#f6ae2d"} />
                                      {activities.rating} rating
                                    </p>
                                    <p>{activities.reviewCount} reviews</p>
                                    <p>{activities.displayAddress[0]}</p>
                                    <p>{activities.displayAddress[1]}</p>
                                  </div>
                                </div>
                              );
                            }
                          )
                        ) : (
                          <h4 className="empty-title">
                            Lets add some activities!
                          </h4>
                        )}
                      </div>
                    </div>
                    {/* </div> */}
                    {/* <div
                        onClick={handleCategoryClick(city.name, "hotel")}
                      className="hotel-div"
                    > */}
                    <input
                      type="radio"
                      name="tabs"
                      id={`${city._id}-2`}
                      className="input"
                      onClick={handleCategoryClick(city.name, "hotel")}
                    />
                    <label className="label" for={`${city._id}-2`}>
                      My Hotel
                    </label>
                    <div className="panel">
                      <div className="collection-cards">
                        {routePreview.middleCities[i].hotels ? (
                          routePreview.middleCities[i].hotels.map((hotels , j) => {
                            return (
                              <div className="itin-data-info show-itin-data">
                                <AiFillCloseSquare onClick={handleDelete(i, j, routePreview.middleCities[i].hotels, "hotel")} className="close-card" size={"30px"} />
                                <div>
                                  <img
                                    className="data-img"
                                    src={hotels.imageUrl}
                                  ></img>
                                </div>
                                <div className="data-words">
                                  <h4>{hotels.name}</h4>
                                  <p>
                                    <AiFillStar color={"#f6ae2d"} />
                                    {hotels.rating} rating
                                  </p>
                                  <p>{hotels.reviewCount} reviews</p>
                                  <p>{hotels.displayAddress[0]}</p>
                                  <p>{hotels.displayAddress[1]}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <h4 className="empty-title">
                            Lets add some places to stay!
                          </h4>
                        )}
                      </div>
                    </div>
                    {/* </div> */}
                    {/* <div
                        onClick={handleCategoryClick(city.name, "food")}
                      className="food-div"
                    > */}
                    <input
                      type="radio"
                      name="tabs"
                      id={`${city._id}-3`}
                      className="input"
                      onClick={handleCategoryClick(city.name, "food")}
                    />
                    <label className="label" for={`${city._id}-3`}>
                      My food
                    </label>
                    <div className="panel">
                      <div className="collection-cards">
                        {routePreview.middleCities[i].food ? (
                          routePreview.middleCities[i].food.map((food, j) => {
                            return (
                              <div className="itin-data-info show-itin-data">
                                <AiFillCloseSquare onClick={handleDelete(i, j, routePreview.middleCities[i].food, "food")} className="close-card" size={"30px"} />
                                <div>
                                  <img
                                    className="data-img"
                                    src={food.imageUrl}
                                  ></img>
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
                            );
                          })
                        ) : (
                          <h4 className="empty-title">
                            Lets add some places to eat!
                          </h4>
                        )}
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            ))}
            <div className="city-div-start-end">
              <div className="city-title-div-start-end">
                <h2 className="city-title">{routePreview.endCity.name}</h2>
              </div>
            </div>
            <div className="line">
              <hr color="#86bbd8" className="login-line"></hr>
            </div>
            <div className="show-page-cta">
              {sessionUser ? (
                <div className="show-page-no-user-cta">
                  <div className="review-create-button show-review">
                    <button onClick={handleCreateItinerary}>
                      Create Itinerary
                    </button>
                  </div>
                </div>
              ) : (
                <div className="show-page-no-user-cta">
                  <div className="review-create-button show-review">
                    <button
                      onClick={() => dispatch(modalActions.openModal("signup"))}
                    >
                      Signup to create itinerary
                    </button>{" "}
                  </div>
                  {/* <div>OR</div> */}
                  <div className="review-create-button show-review">
                    <button
                      onClick={() => dispatch(modalActions.openModal("login"))}
                    >
                      Already have an account? Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="yelp-div">
            <div>
              <h2>
                {plural} in {selectedCity}
              </h2>
            </div>
            <div className="collection-cards yelp-collection">
              {yelpResults.map((res) => {
                return (
                  <div className="itin-data-info yelp-data-info">
                    <div className="yelp-container">
                      <img
                        className="data-img yelp-img"
                        src={res.image_url}
                      ></img>
                    </div>
                    <div className="data-words">
                      <h4>{res.name}</h4>
                      <p>
                        <AiFillStar color={"#f6ae2d"} />
                        {res.rating} rating
                      </p>
                      <p>{res.review_count} reviews</p>
                      <p>{res.location.display_address}</p>
                      <div className="line">
                        <hr color="#86bbd8" className="login-line"></hr>
                      </div>
                      <div className="button-div">
                        <div className="review-create-button show-review">
                          <button onClick={() => handleUpdateMiddleCities(res)}>
                            Choose Me!
                          </button>
                        </div>
                        <div className="review-create-button show-review">
                          <button onClick={() => window.open(res.url)}>
                            <BsYelp size={"30px"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <div className="results-div">
              {yelpResults.map((result) => (
                <div className="result-div">
                  <div className="result-img-div">
                    <img src={result.image_url} className="result-img" />
                  </div>
                  <div className="result-info-div">
                    <h1 className="result-title">{result.name}</h1>
                    <div className="rating-div">
                      <p className="result-rating">Rating: {result.rating}</p>
                      <p>{result.review_count} Reviews</p>
                    </div>
                    <p>{result.categories[0].title}</p>
                    <p>{result.location.display_address}</p>
                    <div className="button-div">
                      <button onClick={() => handleUpdateMiddleCities(result)}>
                        Choose Me!
                      </button>
                      <a href={result.url} target="_blank">
                        Check me out on Yelp!
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </>
    )
  );
};

export default ShowPage;
