import React from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        <li>
          <Link to={"/about-us"}>About Us</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
