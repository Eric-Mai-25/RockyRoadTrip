
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import * as modalActions from "../../store/modal"

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          {/* <Link to={'/tweets'}>All Tweets</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/tweets/new'}>Write a Tweet</Link> */} 
          <p>TODO: LINKS SHOULD GO HERE</p>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <button onClick={() => dispatch(modalActions.openModal("signup"))} className='signup-link'>Sign Up</button>
          <button onClick={() => dispatch(modalActions.openModal("login"))} className="login-link">Login</button>
        </div>
      );
    }
  }

  return (
    <>
      <div className='nav-div'>
        <div className='title-div'>
          <NavLink to={'/'} className="navlink-title"><h1 className='title'>Rocky Road Trip</h1></NavLink>
        </div>
        { getLinks() }
      </div>
    </>
  );
}

export default NavBar;