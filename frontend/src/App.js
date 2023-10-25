import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Modal from './components/Modal/modal';
import ShowPage from './components/ShowPage/ShowPage';
import ItinShow from './components/ItinShow'

import { getCurrentUser } from './store/session';
import SplashPage from './components/SplashPage';
import EditPage from './components/EditPage/EditPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <Modal/>
      <NavBar />
      <Switch>
        <AuthRoute exact path={`/edit`} component={EditPage} /> {/*TODO change from /edit to /edit/itineraryId */}
        <AuthRoute exact path="/" component={SplashPage} />
        <AuthRoute exact path="/itinerary/:itinId" component={ItinShow} />
        <AuthRoute exact path="/show" component={ShowPage} /> {/* TODO Will need to have id in route for specific itinerary, for now though we will not */}
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
      </Switch>
    </>
  );
}

export default App;