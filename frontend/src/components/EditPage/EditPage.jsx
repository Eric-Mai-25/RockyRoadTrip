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

    

    return (
        <>
            <h1>Hi From the edit page!</h1>
        </>
    )
}

export default EditPage;