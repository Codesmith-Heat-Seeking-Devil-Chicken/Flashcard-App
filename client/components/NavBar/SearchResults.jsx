import React from "react";
import "./SearchResults.css";

const SearchResults = ({ result }) => {
  return (
    <div
      className="searchResults"
      onClick={(e) => alert(`You clicked on $(result.name)`)}
    >
      {result.name}
    </div>
  );
};

export default SearchResults;