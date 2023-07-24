import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="navwrapper">
        <div className="navele">
          <Link to="/login" className="Link"> Login </Link>
        </div>
        <div className="navele">
          <Link to="/" className="Link"> Register </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
