import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getItin, fetchItin} from "../../store/itinerary"

function ItinShow(props){
    const dispatch = useDispatch()
    const {itinId} = useParams()
    const [itineraries, setItineraries] = useState("")


    useEffect(()=>{
        dispatch(fetchItin(itinId))
    })

    return(
        <>
            <div>hi</div>

        </>
    )
}

export default ItinShow