import React from "react";
import axios from "axios";

const Landing = ({ currentData }) => {
  return <h1>Landing page</h1>;
};

Landing.getInitialProps = async () => {
  try {
    const response = await axios.get("/api/users/currentuser");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default Landing;
