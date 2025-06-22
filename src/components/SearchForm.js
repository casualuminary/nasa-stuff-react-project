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
      <h4 className="fw-bold text-center">Enter a Celestial Term:</h4>
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="mb-3"><input className="custom-input" type="text" id="queryInput" /></div>
          <button className="col-auto btn btn-lg btn-dark btn-custom px-5" id="searchformbutton">Submit</button>
        </div>
      </form>
      <SearchResults query={query}/>
    </div>
  );
}

export default SearchForm;