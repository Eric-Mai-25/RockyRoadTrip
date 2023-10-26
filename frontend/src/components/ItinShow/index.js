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
    dispatch(fetchItin(itinId));
    dispatch(fetchCities());
  }, []);

  return itin ? (
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
