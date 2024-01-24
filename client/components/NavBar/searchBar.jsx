import React from "react";
import { useState, useEffect } from "react";
import { UseSelector, useSelector } from "react-redux";
import { getDecks } from "../../utils/requests";
import { Button } from "bootstrap";

//search bar functionality
const SearchBar = ({setResults}) => {
  const [searchInput, setSearchInput] = useState("");

  const fetchData = (value) => {
    fetch('http://localhost:3000')
    .then((response) => response.json())
    .then((json) => {
        // console.log(decks)
        const results = json.filter((decks) => {
            //renders a result if there is a value, if decks exists, if deckName exists, and if value can be found among decks
            //the filter:
            return value && decks && decks.deckName && decks.deckName.toLowerCase().includes(value)
        });
        //set results variable to whatever we get back from the filter above
        setResults(results);
    });
  };

  useEffect(() => {
    fetchData();
  }, [searchInput]);

  // useEffect(() => {
  //   const fetchData = (value) => {
  //     fetch('http://localhost:3000')
  //     .then((response) => response.json())
  //     .then((json) => {
  //         // console.log(decks)
  //         const results = json.filter((decks) => {
  //             //renders a result if there is a value, if decks exists, if deckName exists, and if value can be found among decks
  //             //the filter:
  //             return value && decks && decks.deckName && decks.deckName.toLowerCase().includes(value)
  //         });
  //         //set results variable to whatever we get back from the filter above
  //         setResults(results);
  //     });
  //   };
  //   fetchData();
  // }, [searchInput]);

  //retrieve decks from store
  // const decks = useSelector((state) => state.decks.decks);

  // const fetchData = (value) => {
  //   fetch('http://localhost:3000')
  //   .then((response) => response.json())
  //   .then((json) => {
  //       // console.log(decks)
  //       const results = json.filter((decks) => {
  //           //renders a result if there is a value, if decks exists, if deckName exists, and if value can be found among decks
  //           //the filter:
  //           return value && decks && decks.deckName && decks.deckName.toLowerCase().includes(value)
  //       });
  //       //set results variable to whatever we get back from the filter above
  //       setResults(results);
  //   });
  // };

  //create function to handle search bar input
const handleChange = async (e) => {
    e.preventDefault();
    // console.log('entering handle change');
    setSearchInput(e.target.value);
    fetchData(e.target.value);
};
//     //if statement that will return the decks that match what has been entered into the search bar
//     if (searchInput.length > 0) {
//       decks.filter((deck) => {
//         return deck.deckName.match(searchInput);
//       });
//     }

  return (
    <div>
      <input
        className="searchBar"
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      ></input>
      {/* <button className="searchButton"></button> */}
    </div>
  );
};

export default SearchBar;
