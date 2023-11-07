function MapMarker({ city , add}) {
  
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

  return (
    <>
      <li onClick={add(city)} className={`map-marker map-marker-${CITIES_CSS[city.name]}`}>
        <a href="#">{city.name}</a>
        <div className="map-marker-info">
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
    </>
  );
}

export default MapMarker;
