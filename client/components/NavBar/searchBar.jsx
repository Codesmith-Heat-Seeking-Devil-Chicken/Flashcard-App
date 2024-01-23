import React from "react";
import { useState } from "react";
import { UseSelector, useSelector } from "react-redux";
import { getDecks } from "../../utils/requests";
import { Button } from "bootstrap";

//search bar functionality
const searchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  //retrieve decks from store
  const decks = useSelector((state) => state.decks.decks);

  //create function to handle search bar input
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  //create function to handle search bar submit
// const handleSubmit = () => {

// };

  //if statement that will return the decks that match what has been entered into the search bar
  if (searchInput.length > 0) {
    decks.filter((deck) => {
      return deck.deckName.match(searchInput);
    });
  }

  return (
    <div>
      <input
        className="searchBar"
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <button className="searchButton"></button>
    </div>
  );
};

export default searchBar;
