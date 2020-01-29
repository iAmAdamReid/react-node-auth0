import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useAuth0 } from "./auth";
import styled from "styled-components";

const NavBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background: green;
  position: sticky;
  top: 0;
  height: 60px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  max-width: 1080px;
  a {
    text-decoration: none;
    color: white;
    padding: 20px;
    :first-child {
      margin-left: -20px;
    }

    :hover {
      color: lightgreen;
    }
  }
  button {
    margin-left: auto;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: lightgreen;
    color: white;
    cursor: pointer;
  }
`;

const ComponentContainer = styled.div`
  max-width: 1080px;
  width: 80%;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px;
`;

const Navigation = ({ Component, children, ...props }) => {
  // Collect auth information from the auth0 context.
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user
  } = useAuth0();

  console.log("isloading", isLoading);
  // We will render a different navigation based on whether the user is logged in or not.
  return (
    <div>
      {isAuthenticated && !isLoading ? (
        <PrivateNav logout={logout} user={user} />
      ) : (
        <PublicNav loginWithRedirect={loginWithRedirect} />
      )}
      <ComponentContainer>
        <Component {...props}>{children}</Component>
      </ComponentContainer>
    </div>
  );
};

const PublicNav = ({ loginWithRedirect }) => {
  return (
    <NavBar>
      <NavLinks>
        <Link to="/">Home</Link>
        <button onClick={loginWithRedirect}>Log In</button>
      </NavLinks>
    </NavBar>
  );
};

const PrivateNav = ({ logout, user }) => {
  const handleLogout = event => {
    event.preventDefault();

    logout({
      returnTo: `${process.env.REACT_APP_AUTH0_LOGOUT_URL}`,
      client_id: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`
    });
  };

  return (
    <NavBar>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/private">Private</Link>
        <button onClick={handleLogout}>Log Out</button>
      </NavLinks>
    </NavBar>
  );
};

export default withRouter(Navigation);

export const withNav = Component => ({ children, ...props }) => {
  return <Navigation Component={Component} children={children} {...props} />;
};
