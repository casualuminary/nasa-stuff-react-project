import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Game from './components/Game'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults'

import './App.css';

import Header from './containers/Header'

export default class App extends Component {

  state = {
    images: []
  }

//The NASA API is called and then the results go to the state
  fetchImages = async (query = "") => {
    try {
      const res = await fetch(`https://images-api.nasa.gov/search?q=${query}`, {signal: AbortSignal.timeout(5000)});
      const json = await res.json();
      this.setState({images: json.collection.items});
    } catch (err) {
      console.error("Failed to fetch images", err);
    }
  }

  //the welcome component has the header/navbar and the button to choose to search is toggled
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Routes>
            <Route path="/game" element={<Game/>}/>
            <Route
              path="/"
              element={
                <>
                  <SearchForm fetchImages={this.fetchImages}/>
                  <SearchResults getResults={this.state.images}/>
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }

}
