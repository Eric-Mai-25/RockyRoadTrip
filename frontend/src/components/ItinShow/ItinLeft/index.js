import "./itinLeft.css";
import { AiFillStar } from "react-icons/ai";

function ItinLeft({ itin, cities }) {
  const middle = itin.middleCities.map((currCity) => currCity.city);
  const itinStartToFin = [itin.startCity, ...middle, itin.endCity];

  return (
    <>
      <h2>{itin.name}</h2>
      <div className="route-box">
        <div className="route-content">
          <h2 className="route-name">On this route</h2>
          <div className="route-marker">
            {itinStartToFin.map((city, i) => {
              city = cities[city];
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
                              <p>{city.description}</p>
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
      </div>
      <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div>
      <div className="middle-route">
        {itin.middleCities.map((cityData) => {
          const city = cities[cityData.city];
          return (
            <>
              <div>
                <h2>{city.name}</h2>
              </div>
              <div>
                <h3>What you will do</h3>
                <div className="data-box">
                  {cityData.activities.map((activities) => {
                    return (
                      <>
                        <div className="itin-data-info">
                          <div>
                            <img
                              className="data-img"
                              src={activities.imageUrl}
                            ></img>
                          </div>
                          <div className="data-words">
                            <h4>{activities.name}</h4>
                            <p>
                              <AiFillStar color={"#f6ae2d"}/>
                              {activities.rating} rating
                            </p>
                            <p>{activities.reviewCount} reviews</p>
                            <p>
                              {activities.displayAddress[0]}
                            </p>
                            <p>
                              {activities.displayAddress[1]}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3>Where you will stay</h3>
                <div className="data-box">
                {cityData.hotels.map((hotels) => {
                    return (
                      <>
                        <div className="itin-data-info">
                          <div>
                            <img
                              className="data-img"
                              src={hotels.imageUrl}
                            ></img>
                          </div>
                          <div className="data-words">
                            <h4>{hotels.name}</h4>
                            <p>
                              <AiFillStar color={"#f6ae2d"}/>
                              {hotels.rating} rating
                            </p>
                            <p>{hotels.reviewCount} reviews</p>
                            <p>
                              {hotels.displayAddress[0]}
                            </p>
                            <p>
                              {hotels.displayAddress[1]}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3>Where you will eat</h3>
                <div className="data-box">
                {cityData.food.map((food) => {
                    return (
                      <>
                        <div className="itin-data-info">
                          <div>
                            <img
                              className="data-img"
                              src={food.imageUrl}
                            ></img>
                          </div>
                          <div className="data-words">
                            <h4>{food.name}</h4>
                            <p>
                              <AiFillStar color={"#f6ae2d"}/>
                              {food.rating} rating
                            </p>
                            <p>{food.reviewCount} reviews</p>
                            <p>
                              {food.displayAddress[0]}
                            </p>
                            <p>
                              {food.displayAddress[1]}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="line">
        <hr color="#86bbd8" className="login-line"></hr>
      </div>
      <div className="middle-route">
        {itin.reviews.map((review) => {
          return (
            <>
              <div> hi</div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default ItinLeft;
