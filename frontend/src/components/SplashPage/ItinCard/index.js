import React, { useEffect } from "react";
import { fetchItins } from "../../../store/itinerary";
import { useDispatch, useSelector } from "react-redux";
import "./itinCard.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CITIES_CSS = {
  Portland: "portland",
  Seattle: "seattle",
  "San Francisco (SF)": "san-francisco",
  "Los Angeles (LA)": "los-angeles",
  "Las Vegas": "las-vegas",
  Phoenix: "phoenix",
  "Salt Lake City": "salt-lake-city",
  Denver: "denver",
  Minneapolis: "minneapolis",
  Houston: "houston",
  Dallas: "dallas",
  "New Orleans": "new-orleans",
  Chicago: "chicago",
  Milwaukee: "milwaukee",
  Detroit: "detroit",
  "New York City (NYC)": "new-york",
  Boston: "boston",
  Philadelphia: "philadelphia",
  "Washington, D.C. (DC)": "washington-dc",
  Miami: "miami",
  Orlando: "orlando",
  Atlanta: "atlanta",
};

function ItinCard({cities}) {
  const dispatch = useDispatch();
  const itins = useSelector((state) => Object.values(state.itineraries));

  useEffect(() => {
    dispatch(fetchItins());
  }, [dispatch]);

  return itins.length > 1 && cities ? (
    <>
      {shuffleArray(itins)
        .slice(0, 6)
        .map((itin) => {
          const middle = itin.middleCities.map((currCity) => currCity.city);
          const itinStartToFin = [itin.startCity, ...middle, itin.endCity];
          const cityName = cities[itin.endCity].name;

          return (
            <>
              <Link className="link-card" to={`/itinerary/${itin._id}`}>
                <div className={`itin-card card-${CITIES_CSS[cityName]}`}>
                  <div className="itin-title">
                    <h2>{itin.name}</h2>
                    {itinStartToFin.map((cityId) => {
                      return (
                        <>
                          <h3>{cities[cityId].name}</h3>
                        </>
                      );
                    })}
                  </div>
                </div>
              </Link>
            </>
          );
        })}
    </>
  ) : null;
}

export default ItinCard;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
