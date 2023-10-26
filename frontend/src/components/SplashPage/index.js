import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbBus, TbArrowBadgeRightFilled } from "react-icons/tb";
import { addRoute } from "../../store/routeSession";
import { Redirect } from "react-router-dom";
import { BiCurrentLocation, BiSolidChevronRight } from "react-icons/bi";

import Map from "./Map";
import "./SplashPage.css";
import { Link } from "react-router-dom";

function SpashPage(props) {
  const dispatch = useDispatch();
  const [selectedRoute, setSelectedRoute] = useState([]);
  const routePreview = useSelector((state) => state.routePreview);
  const [toggleHero, setToggleHero] = useState(true);
  

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

  if (Object.keys(routePreview).length) {
    return <Redirect to="/show" />;
  }
  const handleToggle = () => {
    setToggleHero(false);
  };

  let currentImage;

  if (toggleHero) {
    currentImage = (
      <>
        <h1>Where will your journey take you?</h1>
        <p>create your dream trip</p>
        <div className="hero-button">
          <button onClick={handleToggle}>Create your route</button>
          <button>
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
        <h2 className="map-splash-title" >Pick your starting city</h2>
        <div className="map-splash">
          <Map add={handleAdd.bind(this)} />
        </div>
      </>
    );
  }

  return (
    <>
      {/* <div class="big-image">
        <div class="overlay">
          <h1>Where will your journey take you?</h1>
          <p>create your dream trip</p>
          <div className="hero-button">
            <button>Create your route</button>
            <button>
              <div className="browse-button">
                Browse
                <BiSolidChevronRight />
              </div>
            </button>
          </div>
        </div>
      </div>
      <Map add={handleAdd.bind(this)} /> */}
      <div class="big-image">
        <div class="overlay">{currentImage}</div>
      </div>
      <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div>
      <div className="route-box">
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
                    <ul class="map-markers route-dot">
                      <li class="map-marker route-map-marker">
                        <a href="#">{city.name}</a>
                        <div class="map-marker-info route-info">
                          <div class="map-marker-info-inner animate-bounce-in">
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
      <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div>
      <div className="route-box">
        <div className="route-content">
          <h2>Route 2</h2>
        </div>
        <div className="route-choose">
          <div>
            <TbBus size={50} color="#f88243" />
            <TbArrowBadgeRightFilled size={50} color="f6ae2d" />
          </div>
        </div>
      </div>
      <div className="route-box">
        <div className="route-content">
          <h2>Route 3</h2>
        </div>
        <div className="route-choose">
          <div>
            <TbBus size={50} color="#f88243" />
            <TbArrowBadgeRightFilled size={50} color="f6ae2d" />
          </div>
        </div>
      </div>
      <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div>
      <div className="itin-card"></div>
    </>
  );
}

export default SpashPage;
