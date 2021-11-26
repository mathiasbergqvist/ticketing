import React from "react";
import axios from "axios";

const Landing = ({ currentUser }) => {
  console.log("CURRENT USER", currentUser);
  return <h1>Landing page</h1>;
};

Landing.getInitialProps = async ({ req }) => {
  // Check if server side
  if (typeof window === "undefined") {
    try {
      const { data } = await axios.get(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
        {
          headers: req.headers,
        }
      );
      return data;
    } catch (err) {
      console.error("getInitialProps server error", err);
    }
  } else {
    try {
      const { data } = await axios.get("/api/users/currentuser");
      return data;
    } catch (err) {
      console.error("getInitialProps client error", err);
    }
  }
};

export default Landing;
