import React from "react";
import { withNav } from "./Navigation";

const Home = props => {
  return <div>This is the home page.</div>;
};

export default withNav(Home);
