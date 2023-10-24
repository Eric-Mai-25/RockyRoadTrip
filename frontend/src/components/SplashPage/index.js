import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "./Map";
import "./SplashPage.css";

function SpashPage(props) {
  return (
    <>
      <div className="slogan">
        <h2>Where will your journey take you?</h2>
      </div>
      <Map />
    </>
  );
}

export default SpashPage;
