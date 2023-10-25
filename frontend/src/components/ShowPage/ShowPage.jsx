import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import "./ShowPage.css"
export const ShowPage = (props) => {

    const [selectedCity, setSelectedCity] = useState(""); // Store the name of the city the user is currenlty interactring with.  
    const [selectedCategory, setSelectedCategory] = useState(""); // Store the currenlty selected category
    const [yelpResults, setYelpResults] = useState([]); //Will store the list of results fetched from the yelp API
    const [selectedBusiness, setSelectedBusiness] = useState({
        // A nested state structure to store selected businesses for each city and category.
        Chicago: {activity: null, hotel: null, food: null},
        KansasCity: {activity: null, hotel: null, food: null},
        LasVegas: {activity: null, hotel: null, food: null}
    })

    const handleCategoryClick = (city, category) => {
        setSelectedCity(city);
        setSelectedCategory(category)
    }

    const routePreview = useSelector((state) => state.routePreview);

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
                        <div className="city-div" key={city}>
                            <div className="city-title-div">
                                <h1 className="city-title">{city}</h1>
                            </div>
                            <div className="a-h-f-div">
                                <div className="activites-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(city, 'activity')}>Choose Activity</button>
                                </div>
                                <div className="hotel-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(city, 'hotel')}>Choose Hotel</button>
                                </div>
                                <div className="food-div">
                                    <button className="a-h-f-words" onClick={() => handleCategoryClick(city, 'food')}>Choose food</button>
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
                    <h1>Yelp Results:</h1>
                    <ul>
                        {yelpResults.map(business => (
                            <li key={business.id}>{business.name}</li>
                        ))}
                    </ul>
                 </div>
            </div>
        </>
    )
}

export default ShowPage;