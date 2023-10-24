import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbBus ,TbArrowBadgeRightFilled } from "react-icons/tb";

import Map from "./Map";
import "./SplashPage.css";

function SpashPage(props) {
  return (
    <>
      <div className="slogan">
        <h2>Where will your journey take you?</h2>
      </div>
      <Map />
      <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div>
      <div className="route-box">
        <div className="route-content">
          <h2>Route 1</h2>
        </div>
        <div className="route-choose">
          <div>
            <TbBus size={50} color="#f88243"/>
            <TbArrowBadgeRightFilled size={50} color="f6ae2d"/>
          </div>
        </div>
      </div>
      <div className="route-box">
        <div className="route-content">
          <h2>Route 2</h2>
        </div>
        <div className="route-choose">
        <div>
            <TbBus size={50} color="#f88243"/>
            <TbArrowBadgeRightFilled size={50} color="f6ae2d"/>

          </div>
        </div>
      </div>
      <div className="route-box">
        <div className="route-content">
          <h2>Route 3</h2>
        </div>
        <div className="route-choose">
        <div>
            <TbBus size={50} color="#f88243"/>
            <TbArrowBadgeRightFilled size={50} color="f6ae2d"/>

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
