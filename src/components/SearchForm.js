import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import SearchResults from "./SearchResults";
import React, { useState } from 'react';

function SearchForm(props){
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  // This lets the SearchImages component know to use the query here for the search action
  const handleSubmit = event => {
    event.preventDefault();
    let queryInputValue = document.getElementById('queryInput').value;
    navigate(`/search?q=${queryInputValue}`);
    setQuery(queryInputValue);
  }

  return (
    <div className="searchcontent">
      <h3 className="searchtext">Enter a Celestial Term:</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" id="queryInput" />
        <Link to="/search" onClick={handleSubmit}><button id="searchformbutton">Submit</button></Link>
      </form>
      <SearchResults query={query}/>
    </div>
  );
}

export default SearchForm;