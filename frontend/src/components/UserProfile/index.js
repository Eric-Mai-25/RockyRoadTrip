import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../store/user";
import UserLeft from "./UserLeft";
import UserRight from "./UserRight";
import { fetchCities } from "../../store/cities";
import "./UserProfile.css";

function UserProfile(props) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userData = useSelector((state) => state.user[userId]);
  const cities = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchCities());
  }, []);

  return userData && cities ? (
    <>
      <div className="user-box">
        <div className="user-left">
          <UserLeft user={userData} />
        </div>
        <div className="user-right">
          <h2>My Itineraries</h2>
          <div className="user-itin">
            {userData.itineraries.map((itin) => {
              return <UserRight itin={itin} cities={cities} />;
            })}
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default UserProfile;
