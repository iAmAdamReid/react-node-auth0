import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../components/auth";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }

    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [isLoading, isAuthenticated, loginWithRedirect, path]);

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
