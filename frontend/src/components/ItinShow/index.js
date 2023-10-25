import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getItin, fetchItin} from "../../store/itinerary"

function ItinShow(props){
    const dispatch = useDispatch()
    const {itinId} = useParams()
    const [itineraries, setItineraries] = useState("")
    const itin = useSelector(state => state.itineraries[itinId])


    useEffect(()=>{
        dispatch(fetchItin(itinId))
    },[])

    return itin ? (
        <>  
            <div>{itin.name}</div>

        </>
    ) : null
}

export default ItinShow