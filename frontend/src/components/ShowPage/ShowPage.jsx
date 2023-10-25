import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./ShowPage.css";
import { addRoute } from "../../store/routeSession";
import { Redirect } from "react-router-dom";

export const ShowPage = (props) => {
    const dispatch = useDispatch();
    const [selectedCity, setSelectedCity] = useState(""); // Store the name of the city the user is currenlty interactring with.  
    const [selectedCategory, setSelectedCategory] = useState(""); // Store the currenlty selected category
    const [yelpResults, setYelpResults] = useState([]); //Will store the list of results fetched from the yelp API
    const [selectedBusiness, setSelectedBusiness] = useState({
        // A nested state structure to store selected businesses for each city and category.
        Chicago: {activity: null, hotel: null, food: null},
        KansasCity: {activity: null, hotel: null, food: null},
        LasVegas: {activity: null, hotel: null, food: null}
    })
    
    const routePreview = useSelector((state) => state.routePreview);

    useEffect(() => {
        let lsRoute = JSON.parse(localStorage.getItem("routePreview")) ||  {};
        if(!Object.keys(routePreview).length && lsRoute){
            dispatch(addRoute(lsRoute))
        }
    }, [])

    const handleCategoryClick = (city, category) => {
        setSelectedCity(city);
        setSelectedCategory(category)
    }

    const fetchYelpData = async () => {
        try{
            const response = await fetch(`/api/yelp/searchYelp?location=${selectedCity}&term=${selectedCategory}&limit=5`);
            const data = await response.json();
            setYelpResults(data.businesses);
        } catch (error) {
            console.error("Error fetching Yelp data:", error);
        }
    }

    useEffect(() => {
        if(selectedCity && selectedCategory) {
            fetchYelpData();
        }
    }, [selectedCity, selectedCategory])

    if(!Object.keys(routePreview).length){
        return <Redirect to="/"/>
    }

    return (
        <>
            <div className="outer-show-div">
                <div className="all-cities-div">
                    <div className="city-div-start-end">
                        <div className="city-title-div-start-end">
                            <h1 className="city-title">{routePreview.startCity.name}</h1>
                        </div>
                    </div>
                    {routePreview.middleCities.map(city => (
                        <div className="city-div" key={city._id}>
                            <div className="city-title-div">
                                <h1 className="city-title">{city.name}</h1>
                            </div>
                            <div className="a-h-f-div">
                                <div className="activites-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(city.name, 'activity')}>Choose Activity</button>
                                </div>
                                <div className="hotel-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(city.name, 'hotel')}>Choose Hotel</button>
                                </div>
                                <div className="food-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(city.name, 'food')}>Choose food</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="city-div-start-end">
                        <div className="city-title-div-start-end">
                            <h1 className="city-title">{routePreview.endCity.name}</h1>
                        </div>
                    </div>
                </div>
                <div className="yelp-div">
                    <div className="results-div">
                        {yelpResults.map(result => (
                            <div className="result-div">
                                <div className="result-img-div">
                                    <img src={result.image_url} className="result-img"/>
                                </div>
                                <div className="result-info-div">
                                    <h1 className="result-title">{result.name}</h1>
                                    <div className="rating-div">
                                        <p className="result-rating">Rating: {result.rating}</p>
                                        <p>{result.review_count} Reviews</p>
                                    </div>
                                    <p>{result.categories[0].title}</p>
                                    <p>{result.location.display_address}</p>
                                    <div className="button-div">
                                        <button>Choose Me!</button>
                                        <a href={result.url} target="_blank">Check me out on Yelp!</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowPage;