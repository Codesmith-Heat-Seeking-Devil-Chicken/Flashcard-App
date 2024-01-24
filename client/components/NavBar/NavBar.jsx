import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar.jsx";

const NavBar = () => {
  return (
    <nav className="NavBar">
      <div className="menuDiv">
        <ul className="menu">
          <li>
            <Link className="logo" to="/">
              coolcards
            </Link>
          </li>
          <li>DISCOVER</li>
          <li>INFO</li>
          <li>DECKS</li>
          <li>LOGIN</li>
        </ul>
      </div>
      <div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
