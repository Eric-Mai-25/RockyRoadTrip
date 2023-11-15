//All imports:
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCities } from "../../store/cities";
import "./EditPage.css";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchItin, getItin, updateItinerary } from "../../store/itinerary";

export const EditPage = (props) => {
    
    const dispatch = useDispatch();
    const [selectedCity, setSelectedCity] = useState(""); // Store the name of the city the user is currenlty interactring with.  
    const [selectedCategory, setSelectedCategory] = useState(""); // Store the currenlty selected category
    const [yelpResults, setYelpResults] = useState([]); //Will store the list of results fetched from the yelp API
    const [citiesLoaded, setCitiesLoaded] = useState(false) //Will keep track of if cities loaded...this will help not crash
    
    window.yelpResults = yelpResults; //TODO DELETE

    window.updateItinerary = updateItinerary;

    
    const {itinId} = useParams(); //This gets the itinerary ID in the url to load the proper itinerary
    
    const cities = useSelector((state) => state.cities); //This gets all the citites in the store updated
    
    const [itinMiddleCities, setItinMiddleCities] = useState([]); //This gets the middle cities for an itinerary
    
    //This sets the city and category for when the category is selected
    const handleCategoryClick = (city, category) => {
        setSelectedCity(city);
        setSelectedCategory(category)
    }

    //This gets the specific itinerary and fetches the cities, as well as sets citiesLoaded to true so loading goes smooothly
    useEffect(() => {
        dispatch(fetchItin(itinId));
        dispatch(fetchCities()).then(() => setCitiesLoaded(true));
    }, [itinId])
    
    const itinerary = useSelector(getItin(itinId));
    
    //This fetches the yelp data using the city and category that was set when a user clicks on a activity
    const fetchYelpData = async () => {
        try{
            const response = await fetch(`/api/yelp/searchYelp?location=${selectedCity}&term=${selectedCategory}&limit=5`);
            const data = await response.json();
            setYelpResults(data.businesses);
        } catch (error) {
            console.error("Error fetching Yelp data:", error);
        }
    }
    
    //This gets a cities name to display on the react componenet
    const getCityName = (cityId) => {
        const city = cities[cityId]
        return city ? city.name : "";
    }
    
    //This activiates the yelp API if a city and category are a thing
    useEffect(() => {
        if(selectedCity && selectedCategory) {
            fetchYelpData();
        }
    }, [selectedCity, selectedCategory])
    


    //This gets the middlecities of an itinerary
    useEffect(() => {  
        if(itinerary){
            const { middleCities } = itinerary;
            
            setItinMiddleCities(middleCities);
        }
    }, [itinerary, itinId]);
    
    //This fucntion will handle when a user selectes the button "choose me!" and will make that acitivity/food/hotel the one chosen to be updated
    const handleChoose = (result, city) => (e) => {
        e.preventDefault();
        
        const updatedItinMiddleCities = JSON.parse(JSON.stringify(itinMiddleCities));
        
        const cityIndex = updatedItinMiddleCities.findIndex(middleCity => getCityName(middleCity.city) === city);

        
        if(cityIndex !== -1){
            const selectedMiddleCity = updatedItinMiddleCities[cityIndex];

            selectedMiddleCity[selectedCategory][0] = {
                name: result.name, 
                busineesId: result.id,
                displayAddress: result.location.display_address,
                imageUrl: result.image_url,
                rating: result.rating,
                reviewCount: result.review_count,
                title: result.categories[0].title
            }


            updatedItinMiddleCities[cityIndex] = selectedMiddleCity;

            setItinMiddleCities(updatedItinMiddleCities);


        }
    }

    const handleUpdate = (e) => {
        dispatch(updateItinerary(itinId, itinMiddleCities))
    }


    
    //The react component:
    return (itinerary && cities && citiesLoaded && itinerary.middleCities) ? (
        <>
            <div className="outer-show-div-edit">
                <div className="all-cities-div">
                    <div className="itin-name-edit">
                        <h2>{itinerary.name}</h2>
                    </div>
                    <div className="city-div-start-end-edit">
                        <div className="city-title-div-start-end">
                            <h1 className="city-title">{getCityName(itinerary.startCity)}</h1>
                        </div>
                    </div>
                    {itinerary.middleCities.map(city => (
                        <div className="city-div" key={city.city}>
                            <div className="city-title-div">
                                <h2 className="city-title">{getCityName(city.city)}</h2>
                            </div>
                            <div className="a-h-f-div">
                                <div className="activites-div">
                                    <button className="a-h-f-words-edit" onClick={() => handleCategoryClick(getCityName(city.city), 'activities')}>Choose Activity</button>
                                </div>
                                <div className="hotel-div">
                                    <button className="a-h-f-words-edit" onClick={() => handleCategoryClick(getCityName(city.city), 'hotels')}>Choose Hotel</button>
                                </div>
                                <div className="food-div">
                                    <button className="a-h-f-words-edit" onClick={() => handleCategoryClick(getCityName(city.city), 'food')}>Choose food</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="city-div-start-end-edit">
                        <div className="city-title-div-start-end-edit">
                            <h1 className="city-title">{getCityName(itinerary.endCity)}</h1>
                        </div>
                    </div>
                    <div className="update-button-div">
                        <NavLink className="update-button-edit" to={`/itinerary/${itinId}`} onClick={handleUpdate}>Update Itinerary</NavLink>
                    </div>
                 </div>
                 <div className="yelp-div-edit">
                    <div>
                        <h2>
                            { selectedCity && selectedCategory ? `${selectedCity}: ${selectedCategory}` : 'Select a category!' }
                        </h2>
                    </div>
                    <div className="results-div">
                        {yelpResults.map(result => (
                            <div className="result-div-edit">
                                <div className="result-img-div">
                                    <img src={result.image_url} className="result-img"/>
                                </div>
                                <div className="result-info-div">
                                    <h2 className="result-title-edit">{result.name}</h2>
                                    <div className="rating-div">
                                        <p className="result-rating">Rating: {result.rating}</p>
                                        <p>{result.review_count} Reviews</p>
                                    </div>
                                    <p>{result.categories[0].title}</p>
                                    <p>{result.location.display_address}</p>
                                    <div className="button-div">
                                        <button onClick={handleChoose(result, selectedCity)} className="choose-button">Choose Me!</button>
                                        <a href={result.url} target="_blank" className="check-me-out">Check me out on Yelp!</a>
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