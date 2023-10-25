import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCities } from "../../store/cities";
import "./EditPage.css";

export const EditPage = (props) => {
    
    const dispatch = useDispatch();
    const [selectedCity, setSelectedCity] = useState(""); // Store the name of the city the user is currenlty interactring with.  
    const [selectedCategory, setSelectedCategory] = useState(""); // Store the currenlty selected category
    const [yelpResults, setYelpResults] = useState([]); //Will store the list of results fetched from the yelp API
    const [itinerary, setItinerary] = useState({})
    const [citiesLoaded, setCitiesLoaded] = useState(false)

    const cities = useSelector((state) => state.cities);

    const handleCategoryClick = (city, category) => {
        setSelectedCity(city);
        setSelectedCategory(category)
    }

    useEffect(() => {
        getItinerary()
        console.log("itinerary: ", itinerary)
        dispatch(fetchCities()).then(() => setCitiesLoaded(true));
    }, [])

    const getItinerary = async() => {
        try{
            const response = await fetch(`/api/itineraries/6538b1fc91da721e2abe4105`)
            const data = await response.json();
            console.log("data: ", data)
            setItinerary(data)
        } catch (error){
            console.error("Error fetching itinerary", error);
        }
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

    const getCityName = (cityId) => {
        const city = cities[cityId]
        return city ? city.name : "";
    }

    useEffect(() => {
        if(selectedCity && selectedCategory) {
            fetchYelpData();
        }
    }, [selectedCity, selectedCategory])




    return (itinerary && cities && citiesLoaded && itinerary.middleCities) ? (
        <>
            {console.log("itinerary in return", itinerary)}
            <div className="outer-show-div">
                <div className="all-cities-div">
                    <div className="city-div-start-end">
                        <div className="city-title-div-start-end">
                            <h1 className="city-title">{getCityName(itinerary.startCity)}</h1>
                        </div>
                    </div>
                    {itinerary.middleCities.map(city => (
                        <div className="city-div" key={city.city}>
                            <div className="city-title-div">
                                <h1 className="city-title">{getCityName(city.city)}</h1>
                            </div>
                            <div className="a-h-f-div">
                                <div className="activites-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(getCityName(city.city), 'activity')}>Choose Activity</button>
                                </div>
                                <div className="hotel-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(getCityName(city.city), 'hotel')}>Choose Hotel</button>
                                </div>
                                <div className="food-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(getCityName(city.city), 'food')}>Choose food</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="city-div-start-end">
                        <div className="city-title-div-start-end">
                            <h1 className="city-title">{getCityName(itinerary.endCity)}</h1>
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
    ) : (
        null
    )
}

export default EditPage;

// cities && Array.isArray(cities) ? cities.find(city => city._id === itinerary._id)?.name : 'City not found'