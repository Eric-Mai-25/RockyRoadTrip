import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Authenticated routes
export const AuthRoute = ({ component: Component, path, exact }) => {
  // Use Redux to check if the user is logged in
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route path={path} exact={exact} render={(props) => (
      // If not logged in, go to the requested component
      !loggedIn ? (
        <Component {...props} />
      ) : (
        // If logged in, redirect to the HomePage
        <Redirect to="/" /> //TODO Changed this from '/tweets' to just '/', should redirect to homepage if logged in.
      )
    )} />
  );
};

// Protected routes
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Use Redux to check if the user is logged in
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route
      {...rest}
      render={props =>
        // If logged in, go to the requested component
        loggedIn ? (
          <Component {...props} />
        ) : (
          // If not logged in, redirect to the login page
          <Redirect to="/login" />
        )
      }
    />
  );
};
