import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

export const Auth0Context = createContext(null);
export const useAuth0 = () => useContext(Auth0Context);

export class Auth0Provider extends Component {
  state = {
    auth0Client: null,
    isLoading: true,
    isAuthenticated: false,
    user: null
  };

  config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: `${window.location.origin}/private`,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE
  };

  componentDidMount() {
    this.initializeAuth0();
  }

  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    this.setState({ auth0Client });
    if (window.location.search.includes("code=")) {
      return this.handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({ isLoading: false, isAuthenticated, user });
  };

  handleRedirectCallback = async () => {
    this.setState({ isLoading: true });
    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();

    this.setState({ user, isAuthenticated: true, isLoading: false });
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  setHeaders = async () => {
    let token = await this.state.auth0Client.getTokenSilently();
    let options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return options;
  };

  render() {
    const { auth0Client, isLoading, isAuthenticated, user } = this.state;
    const { children } = this.props;
    const configObject = {
      isLoading,
      isAuthenticated,
      user,
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
      setHeaders: (...p) => this.setHeaders(...p),
      logout: (...p) => auth0Client.logout(...p)
    };

    return (
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    );
  }
}
