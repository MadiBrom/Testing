import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/slime">Slime</Link>
        </li>
        <li>
          <Link to="/buttons">Buttons</Link>
        </li>
        <li>
          <Link to="/birds">Birds</Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
