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
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

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
        <Route exact path="/edit/:itinId" component={EditPage} />
        <Route exact path="/" component={SplashPage} />
        <Route exact path="/itinerary/:itinId" component={ItinShow} />
        <Route exact path="/show" component={ShowPage} /> {/* TODO Will need to have id in route for specific itinerary, for now though we will not */}
      </Switch>
    </>
  );
}

export default App;