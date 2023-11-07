import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbBus, TbArrowBadgeRightFilled } from "react-icons/tb";
import { addRoute } from "../../store/routeSession";
import { Redirect } from "react-router-dom";
import homeImage from "../../assets/images/splash.jpg";
import { BiCurrentLocation, BiSolidChevronRight } from "react-icons/bi";
import { fetchCities } from "../../store/cities";

import Map from "./Map";
import "./SplashPage.css";
import { Link } from "react-router-dom";
import { fetchItins } from "../../store/itinerary";
import ItinCard from "./ItinCard";

function SpashPage(props) {
  const dispatch = useDispatch();
  const [selectedRoute, setSelectedRoute] = useState([]);
  const routePreview = useSelector((state) => state.routePreview);
  const [toggleHero, setToggleHero] = useState(true);

  const cities = useSelector((state) => state.cities);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(fetchCities());
  }, []);

  const handleAdd = (city) => (e) => {
    setSelectedRoute([...selectedRoute, city]);
  };

  const handleRouteSession = (e) => {
    let routePreview = {
      startCity: selectedRoute[0],
      endCity: selectedRoute[selectedRoute.length - 1],
      middleCities: selectedRoute.slice(1, selectedRoute.length - 1),
    };
    dispatch(addRoute(routePreview));
  };

  // if (Object.keys(routePreview).length) {
  //   return <Redirect to="/show" />;
  // }
  const handleToggle = (field) => () => {
    setToggleHero(false);
    handleClickScroll(field);
  };

  const handleBrowse = (field) => (e) => {
    handleClickScroll(field);
  };
  const handleClickScroll = (field) => {
    const element = document.getElementById(field);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  let currentImage;

  if (toggleHero) {
    currentImage = (
      <>
        <h1>Where will your journey take you?</h1>
        <p>create your dream trip</p>
        <div className="hero-button">
          <button className="create-button" onClick={handleToggle("big-image")}>
            Create your route
          </button>
          <button onClick={handleBrowse("user-itin")}>
            <div className="browse-button">
              Browse
              <BiSolidChevronRight />
            </div>
          </button>
        </div>
      </>
    );
  } else {
    currentImage = (
      <>
        <h2 className="map-splash-title">Pick your starting city</h2>
        <div className="map-splash">
          <Map add={handleAdd.bind(this)} cities={cities} />
          <div className="route-box title-route">
            <div className="route-content">
              <h2 className="route-name">Your Custom Route</h2>
              <div className="route-marker">
                {selectedRoute.map((city, i) => {
                  return (
                    <>
                      {i === 0 ? null : (
                        <hr color="#86bbd8" className="route-line"></hr>
                      )}
                      <div className="route-line-content">
                        <ul className="map-markers route-dot">
                          <li className="map-marker route-map-marker">
                            <a href="#">{city.name}</a>
                            <div className="map-marker-info route-info">
                              <div className="map-marker-info-inner animate-bounce-in">
                                <header>
                                  <h2>{city.name}</h2>
                                </header>

                                <main>
                                  <h5>{city.description}</h5>
                                </main>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <h2 className="route-city-name">{city.name}</h2>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <div className="route-choose">
              <Link to={"/show"}>
                <button onClick={handleRouteSession}>
                  <TbBus size={50} color="#f88243" />
                  <TbArrowBadgeRightFilled size={50} color="f6ae2d" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return cities ? (
    <>
      <div className="big-image" id="big-image">
        <div className="overlay">{currentImage}</div>
      </div>
      {/* <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div> */}
      <div className="splash-detail">
        <div className="detail-data">
          <div>
            <div className="detail-words">
              <div>
                <h2>Create your route in minutes!</h2>
              </div>
              <div>
                <h3> Personalize your itinerary along the way!</h3>
              </div>
              <div className="create-review-button">
                <button onClick={handleToggle("big-image")}>
                  Start your route!
                </button>
              </div>
            </div>
          </div>
          <div className="detail-image">
            <img src={homeImage} />
          </div>
        </div>
      </div>
      <div className="user-created-title" id="user-itin">
        <h2>Check out some of what our users created!</h2>
      </div>
      <div className="user-itins">
        <div className="splash-itin-box">
          <ItinCard cities={cities} />
        </div>
      </div>
    </>
  ) : <div>Loading</div>;
}

export default SpashPage;
