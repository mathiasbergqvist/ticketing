import React, { useState } from "react";
import axios from "axios";
import useRequest, { METHOD } from "../../hooks/use-request";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: METHOD.POST,
    body: {
      email,
      password,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Singup</h1>
      <div className="form-group">
        <label>E-mail</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className="btn btn-primary" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
