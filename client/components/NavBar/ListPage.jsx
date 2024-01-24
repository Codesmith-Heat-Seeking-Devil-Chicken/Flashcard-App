import React from "react";
import SearchResults from "./SearchResults.jsx";
import "./ListPage.css";

const ListPage = ({ results }) => {
  const resultList = results.map((result, id) => {
  <SearchResults result={result} key={id} />;
  });

return (
    <div className="resultsList">
        {resultList}
    </div>
    )
};

export default ListPage;
