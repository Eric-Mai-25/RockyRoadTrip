import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCities } from "../../../store/cities";

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

const UserRight = ({ itin, cities }) => {
  console.log("here");
  const dispatch = useDispatch();

  const middle = itin.middleCities.map((currCity) => currCity.city);
  const itinStartToFin = [itin.startCity, ...middle, itin.endCity];
  const cityName = cities[itin.endCity].name;

  return cities ? (
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
  ) : null;
};

export default UserRight;
