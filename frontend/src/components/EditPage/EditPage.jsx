import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCities } from "../../store/cities";
import "./EditPage.css";

export const EditPage = (props) => {
    
    const dispatch = useDispatch();
    const [selectedCity, setSelectedCity] = useState(""); // Store the name of the city the user is currenlty interactring with.  
    const [selectedCategory, setSelectedCategory] = useState(""); // Store the currenlty selected category
    const [yelpResults, setYelpResults] = useState([]); //Will store the list of results fetched from the yelp API
    const [intinerary, setItinerary] = useState({})
    const [citiesLoaded, setCitiesLoaded] = useState(false)

    const cities = useSelector((state) => state.cities);

    const handleCategoryClick = (city, category) => {
        setSelectedCity(city);
        setSelectedCategory(category)
    }

    useEffect(() => {
        getItinerary()
        dispatch(fetchCities()).then(() => setCitiesLoaded(true));
    }, [])

    const getItinerary = async() => {
        try{
            const response = await fetch(`/api/itineraries/6538b1fc91da721e2abe4105`)
            const data = await response.json();
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
        if (Array.isArray(cities)) {
            const city = cities.find(city => city._id === cityId);
            return city ? city.name : "";
        }
        return "Not found";
    }

    useEffect(() => {
        if(selectedCity && selectedCategory) {
            fetchYelpData();
        }
    }, [selectedCity, selectedCategory])




    return (intinerary && cities && citiesLoaded) ? (
        <>
            <div className="outer-show-div">
                <div className="all-cities-div">
                    <div className="city-div-start-end">
                        <div className="city-title-div-start-end">
                            <h1 className="city-title">{getCityName(intinerary.startCity)}</h1>
                        </div>
                    </div>
                 </div>
            </div>
        </>
    ) : (
        null
    )
}

export default EditPage;

// cities && Array.isArray(cities) ? cities.find(city => city._id === intinerary._id)?.name : 'City not found'