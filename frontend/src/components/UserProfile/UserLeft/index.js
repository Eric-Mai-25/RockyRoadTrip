
import "./UserLeft.css"
//Load user data

const  UserLeft = ({user}) =>{

  return user? (
    <>
      <div className="user-data">
        <img  className="user-image" src={`${user.imgUrl}`}/>
        <h2>{user.username}</h2>
        <h5>{user.email}</h5>
      </div>
    </>
  ) : null;
}

export default UserLeft
