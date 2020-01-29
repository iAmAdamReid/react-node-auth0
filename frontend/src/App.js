import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Private from "./components/Private";
import styled from "styled-components";

const AppContainer = styled.div`
  min-height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <Switch>
        <Route exact path="/" component={Home} />

        <PrivateRoute path="/private" component={Private} />
      </Switch>
    </AppContainer>
  );
};
export default App;
