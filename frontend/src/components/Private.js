import React from "react";
import { withNav } from "./Navigation";

const Private = props => {
  return <div>This is a private route</div>;
};

export default withNav(Private);
