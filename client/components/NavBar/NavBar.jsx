import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from './searchBar.jsx';
import ListPage from './listPage.jsx';
import { getDecks } from '../../utils/requests.js';
import { loadDecks } from '../../redux/decksSlice.js';

const NavBar = () => {
  const [results, setResults] = useState([]);
console.log(results);
  return (
    <nav className='NavBar'>
      <div className='menuDiv'>
        <ul className='menu'>
          <li>
            <Link className='logo' to='/'>
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
        <SearchBar setResults={setResults}/>
        <ListPage results={results}/>
        {/* <input className='searchBar' 
        placeholder='SEARCH' 
        onChange={handleChange}
        ></input> */}
      </div>
    </nav>
  );
};

export default NavBar;
