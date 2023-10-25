import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import "./EditPage.css";

export const EditPage = (props) => {

    const [selectedCity, setSelectedCity] = useState(""); // Store the name of the city the user is currenlty interactring with.  
    const [selectedCategory, setSelectedCategory] = useState(""); // Store the currenlty selected category
    const [yelpResults, setYelpResults] = useState([]); //Will store the list of results fetched from the yelp API

    const handleCategoryClick = (city, category) => {
        setSelectedCity(city);
        setSelectedCategory(category)
    }

    const itinerary = {

_id: 6538b1fc91da721e2abe4105
name
"Lets rock it !!!"
startCity
6538b1f991da721e2abe40cd
endCity
6538b1f991da721e2abe40d3

middleCities
Array

0
Object
city
6538b1f991da721e2abe40c9

activities
Array

0
Object
name
"Golden Gate Bridge"
_id
6538b1fc91da721e2abe4107

hotels
Array

0
Object
name
"Hotel Caza Fisherman's Wharf"
_id
6538b1fc91da721e2abe4108

food
Array

0
Object
name
"Bun Mee"
_id
6538b1fc91da721e2abe4109
_id
6538b1fc91da721e2abe4106
author
6538b1f891da721e2abe40bb
__v
0
    }

    return (
        <>
            <h1>Hi From the edit page!</h1>
        </>
    )
}

export default EditPage;