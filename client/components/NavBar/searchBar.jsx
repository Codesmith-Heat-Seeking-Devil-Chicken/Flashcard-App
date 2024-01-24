import React from "react";
import { useDispatch } from "react-redux";
import { updateSearchDeck } from "../../redux/decksSlice";

//search bar functionality
const SearchBar = (props) => {
  const dispatch = useDispatch();

  const updateSearchValue = (value) => {
    fetch("http://localhost:3000/deck")
      .then((response) => response.json())
      .then((result) => {
        let filteredResult = result;

        if (value !== undefined) {
          filteredResult = result.filter((deck) => {
            return (
              deck &&
              deck.deckName &&
              deck.deckName.toLowerCase().includes(value.toLowerCase())
            );
          });
          dispatch(
            updateSearchDeck(filteredResult.length > 0 ? filteredResult : [[]])
          );
        }
      });
  };

  //create function to handle search bar input
  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.value !== undefined) {
      updateSearchValue(e.target.value);
    }
  };

  return (
    <div>
      <input
        className="searchBar"
        type="text"
        placeholder="Search here"
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default SearchBar;
