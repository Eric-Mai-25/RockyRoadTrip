import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./ShowPage.css";
import { addRoute } from "../../store/routeSession";
import * as itinerariesAction from "../../store/itinerary";
import * as modalActions from "../../store/modal";
import { useHistory } from "react-router-dom";

export const ShowPage = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedCity, setSelectedCity] = useState(""); // Store the name of the city the user is currenlty interactring with.  
    const [selectedCategory, setSelectedCategory] = useState(""); // Store the currenlty selected category
    const [yelpResults, setYelpResults] = useState([]); //Will store the list of results fetched from the yelp API
    const [itineraryName, setItineraryName] = useState("");
    const [errors, setErrors] = useState([]);
    
    const sessionUser = useSelector((state) => state.session.user);
    const routePreview = useSelector((state) => state.routePreview);

    useEffect(() => {
        let lsRoute = JSON.parse(localStorage.getItem("routePreview")) ||  {};
        if(!Object.keys(routePreview).length && lsRoute){
            dispatch(addRoute(lsRoute))
        } 

        if(lsRoute.middleCities.length){
            setSelectedCity(lsRoute.middleCities[0].name);
            setSelectedCategory("activity");
        }
    }, [])

    const handleCategoryClick = (city, category) => {
        setSelectedCity(city);
        setSelectedCategory(category);
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

    const handleUpdateMiddleCities = (selectedRes) => {

        let routePreviewCopy = {...routePreview}

        routePreviewCopy.middleCities.forEach((middleCity) => {
            if(!middleCity.city){
                middleCity.city = middleCity._id
            }
            if(middleCity.name !== selectedCity){
                return
            }

            let objToInsert = {
                name: selectedRes.name,
                imageUrl: selectedRes.image_url,
                rating: selectedRes.rating,
                reviewCount: selectedRes.review_count,
                title: selectedRes.categories[0].title,
                displayAddress: selectedRes.location.display_address,
                busineesId: selectedRes.id
            }

            switch (selectedCategory) {
                case "activity":
                    let activities = middleCity.activities || []
                    activities.push(objToInsert)
                    middleCity.activities = activities
                    break;
                case "hotel":
                    let hotels = middleCity.hotels || []
                    hotels.push(objToInsert);
                    middleCity.hotels = hotels
                    break;
                case "food":
                    let food = middleCity.food || []
                    food.push(objToInsert);
                    middleCity.food = food;
                    break;
            }
        })
        dispatch(addRoute(routePreviewCopy))
    }

    const handleCreateItinerary = () => {
        let itineraryObj = {name: itineraryName}

        itineraryObj.startCity = routePreview.startCity._id
        itineraryObj.endCity = routePreview.endCity._id
        itineraryObj.middleCities = []

        routePreview.middleCities.forEach(middleCity => {
            let midCity = {}
            midCity.city = middleCity._id;
            midCity.activities = middleCity.activities || [];
            midCity.hotels = middleCity.hotels || [];
            midCity.food = middleCity.food || [];
            itineraryObj.middleCities.push(midCity);
        })

        dispatch(itinerariesAction.createItinerary(itineraryObj))
            .then((data) => {
                history.push(`/itinerary/${data._id}`);
            })
            .catch(async(res) => {
                let data;
                try {
                    data = await res.json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }

                if (data?.errors) {
                    let errs = []
                    Object.entries(data.errors).forEach(([key, value]) => {
                        if(key === "name"){
                            errs.push(`Invalid Name`);
                        } else {
                            errs.push(value);
                        }
                    })
                    setErrors(errs);
                }
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
    }
    
    return (Object.keys(routePreview).length && 
        <>
            <div className="outer-show-div">
                <div className="all-cities-div">
                    {errors.map((error) => <div>{error}</div>)}
                    <div className="itinerary-title">Choose a unique name for your itinerary
                        <input type="text" value={itineraryName} 
                            onChange={(e) => setItineraryName(e.target.value)}></input>
                    </div>

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
                    <div className="show-page-cta">
                    {sessionUser ? 
                        <div className="show-page-with-user">
                            <button onClick={handleCreateItinerary}>Create Itinerary</button> 
                        </div> :
                        <div className="show-page-no-user-cta">
                            <button onClick={() => dispatch(modalActions.openModal("signup"))}>Signup to create itinerary</button> OR 
                            <button onClick={() => dispatch(modalActions.openModal("login"))}>Already have an account? Login to create itinerary</button>
                        </div>
                    }
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
                                        <button onClick={() => handleUpdateMiddleCities(result)}>Choose Me!</button>
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