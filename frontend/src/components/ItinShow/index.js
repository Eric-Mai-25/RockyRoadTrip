import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItin, fetchItin } from "../../store/itinerary";
import ItinLeft from "./ItinLeft";
import { fetchCities } from "../../store/cities";
import ItinRight from "./ItinRight";
import "./ItinShow.css"

function ItinShow(props) {
  const dispatch = useDispatch();
  const { itinId } = useParams();
  const [itineraries, setItineraries] = useState("");
  const itin = useSelector((state) => state.itineraries[itinId]);
  const cities = useSelector((state) => state.cities);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    dispatch(fetchItin(itinId));
    dispatch(fetchCities());
  }, [itinId]);

  if (!itin || !cities){
    return null
  }

  console.log("itin: ", itin)

  return Object.keys(itin).length && Object.keys(cities).length && itin.middleCities ? (
    <>
      <div className="itin-show-box-left">
        <ItinLeft itin={itin} cities={cities} />
        </div>
        <div className="itin-show-box-right">
        <ItinRight />
      </div>
    </>
  ) : null;
}

export default ItinShow;
