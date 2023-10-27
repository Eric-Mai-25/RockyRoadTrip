import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCities } from "../../store/cities";
import "./EditPage.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchItin, getItin } from "../../store/itinerary";

export const EditPage = (props) => {
    
    const dispatch = useDispatch();
    const [selectedCity, setSelectedCity] = useState(""); // Store the name of the city the user is currenlty interactring with.  
    const [selectedCategory, setSelectedCategory] = useState(""); // Store the currenlty selected category
    const [yelpResults, setYelpResults] = useState([]); //Will store the list of results fetched from the yelp API
    const [citiesLoaded, setCitiesLoaded] = useState(false)
    
    window.yelpResults = yelpResults; //TODO DELETE
    
    const {itinId} = useParams();
    
    const cities = useSelector((state) => state.cities);
    
    const [itinMiddleCities, setItinMiddleCities] = useState([]);
    
    const handleCategoryClick = (city, category) => {
        setSelectedCity(city);
        setSelectedCategory(category)
    }
    
    useEffect(() => {
        dispatch(fetchItin(itinId));
        dispatch(fetchCities()).then(() => setCitiesLoaded(true));
    }, [])
    
    const itinerary = useSelector(getItin(itinId));
    
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

    useEffect(() => {
        const { middleCities } = itinerary;

        setItinMiddleCities(middleCities);
        console.log("ItinMiddleCity: ", itinMiddleCities)
    }, [itinerary]);

    const handleChoose = (result, city) => (e) => {
        e.preventDefault();

        const updatedItinMiddleCities = JSON.parse(JSON.stringify(itinMiddleCities));
        console.log("updatedItinMiddleCities: ", updatedItinMiddleCities);

        const cityIndex = updatedItinMiddleCities.findIndex(middleCity => getCityName(middleCity.city) === city);
        console.log("cityIndex", cityIndex);

        if(cityIndex !== -1){
            const selectedMiddleCity = updatedItinMiddleCities[cityIndex];
            console.log("selectedMiddleCity", selectedMiddleCity);
        }
    }


    return (itinerary && cities && citiesLoaded && itinerary.middleCities) ? (
        <>
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
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(getCityName(city.city), 'activities')}>Choose Activity</button>
                                </div>
                                <div className="hotel-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(getCityName(city.city), 'hotels')}>Choose Hotel</button>
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
                    <div className="update-button-div">
                        <button className="update-button">Update Itinerary</button>
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
                                        <button onClick={handleChoose(result, selectedCity)}>Choose Me!</button>
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
        <>
            <h1>Not loaded properly</h1>
        </>
    )
}

export default EditPage;

// cities && Array.isArray(cities) ? cities.find(city => city._id === itinerary._id)?.name : 'City not found'