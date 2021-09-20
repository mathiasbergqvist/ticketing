import React from "react";

const Signup = () => {
  return (
    <form>
      <h1>Singup</h1>
      <div className="form-group">
        <label>E-mail</label>
        <input className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input className="form-control" type="password" />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default Signup;
