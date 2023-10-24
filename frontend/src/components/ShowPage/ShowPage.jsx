import { useState } from "react";
import "./ShowPage.css"
export const ShowPage = (props) => {
    const [routePreview, setRoutePreview] = useState({
        startCity: "New York City",
        endCity: "San Francisco",
        middleCities: ["Chicago", "Kansas City", "Las Vegas"]
    })    


    return (
        <>
            <div className="outer-show-div">
                <div className="all-cities-div">
                    <div className="city-div-start-end">
                        <div className="city-title-div-start-end">
                            <h1 className="city-title">{routePreview.startCity}</h1>
                        </div>
                    </div>
                    {routePreview.middleCities.map(city => (
                        <div className="city-div">
                            <div className="city-title-div">
                                <h1 className="city-title">{city}</h1>
                            </div>
                            <div className="a-h-f-div">
                                <div className="activites-div">
                                    <p className="a-h-f-words">Choose Activity</p>
                                </div>
                                <div className="hotel-div">
                                    <p className="a-h-f-words">Choose Hotel</p>
                                </div>
                                <div className="food-div">
                                    <p className="a-h-f-words">Choose food</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="city-div-start-end">
                        <div className="city-title-div-start-end">
                            <h1 className="city-title">{routePreview.endCity}</h1>
                        </div>
                    </div>
                </div>
                 <div className="yelp-div">
                    <h1>Where Yelp API will go</h1>
                 </div>
            </div>
        </>
    )
}

export default ShowPage;