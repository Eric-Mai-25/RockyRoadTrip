import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchUser } from "../../store/user"
import UserLeft from "./UserLeft"
import UserRight from "./UserRight"


function UserProfile (props){   
    const dispatch = useDispatch()
    const {userId} = useParams()
    // const itineraries = useSelector(state => state.itineraries)
    // const userData = useSelector(state => state.user)
    
    useEffect(()=>{
        // dispatch(fetchUser(userId))
    }, [])


    return(
        <>
            <div>
                <div className="user-left">
                    <h2>Hi</h2>
                    <UserLeft />
                </div>
                <div className="user-right">
                    <UserRight />
                </div>
            </div>
        </>
    )
}


export default UserProfile