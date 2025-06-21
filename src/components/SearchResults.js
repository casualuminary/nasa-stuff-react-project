import React, { Component } from 'react';
import moon from './moon.jpg'
import loadingStatus from '../helpers/loadingStatus';
import LoadingIndicator from "./LoadingIndicator";
import useNasaImages from "../hooks/useNasaImages";

function SearchResults({query}){
  const {images, loadingState} = useNasaImages(query);

  // This function determines if an image is present in the object and if not, renders a default image
  const hasImage = (result) => {
    if (typeof result !== 'undefined') {
      return result[0].href
    } else {
      return moon
    }
  }

  // This determines if the title exists, much like the function above
  const hasContent = (result) => {
    if (typeof result !== 'undefined') {
      return result[0].title
    } else {
      return "No content"
    }
  };

  //this function helps when presenting the cards - if the title and description are the same, it doesn't show the description
  const sameContent = (a, b) => {
    if (a === b) {
      return null
    } else {
      return b
    }
  };

  //A function to help show a message when the search term returns no results
  const noResults = () => {
    return <div className="noresult">no results yet</div>
  };

  if (loadingState != loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />
  else if (images) {
    return images.map((image, index) =>
      <div className="cardborder" key={index}>
        <div className="leftbox">
          <div className="image"><img src={hasImage(image.links)} alt=""/></div>
        </div>
        <div className="rightbox">
          <div className="title">{hasContent(image.data)}</div>
        </div>
        <div className="clearfix">
          <div className="bottombox">
            <div className="desc">
              {sameContent(image.data[0].title, image.data[0].description)}
            </div>
          </div>
        </div>
        <div className="creator">
          {image.data[0].secondary_creator}
        </div>
      </div>)
  } else {
    return noResults();
  }
}

export default SearchResults;