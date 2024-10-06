import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Slime</Link>
        </li>
        <li>
          <Link to="/buttons">Buttons</Link>
        </li>
        {/* <li>
          <Link to="/bubbles">Bubbles</Link>
        </li> */}
      </ul>
    </>
  );
};

export default Navbar;
