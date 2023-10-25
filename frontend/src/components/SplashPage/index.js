import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbBus, TbArrowBadgeRightFilled } from "react-icons/tb";
import { addRoute } from "../../store/routeSession";

import Map from "./Map";
import "./SplashPage.css";
import { Link } from "react-router-dom";
import MapMarker from "./Map/MapMarker";
import { Redirect } from "react-router-dom";

function SpashPage(props) {
  const dispatch = useDispatch()
  const [selectedRoute, setSelectedRoute] = useState([]);
  const  data = useSelector(state=> state)

  const handleAdd = (city) => (e) => {
    setSelectedRoute([...selectedRoute, city]);
    console.log(selectedRoute);
  };
  
  const handleRouteSession = e =>{
    let routePreview =  {
      "startCity": selectedRoute[0],
      "endCity": selectedRoute[selectedRoute.length-1],
      "middleCities": selectedRoute.slice(1, selectedRoute.length-1)
    }
    dispatch(addRoute(routePreview));
  }

  return (
    <>
      <div className="slogan">
        <h2>Where will your journey take you?</h2>
      </div>
      <Map add={handleAdd.bind(this)} />
      <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div>
      <div className="route-box">
        <div className="route-content">
          <h2>Route 1</h2>
          <div>
            {selectedRoute.map((city) => {
              return <div>hi</div>;
            })}
          </div>
        </div>
        <div className="route-choose">
          <Link  to={"/show"}>
            <button onClick={handleRouteSession}>
              <TbBus size={50} color="#f88243" />
              <TbArrowBadgeRightFilled size={50} color="f6ae2d" />
            </button>
          </Link>
        </div>
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
