import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Game from './components/Game'
import SearchForm from './components/SearchForm'
import Header from './containers/Header'
import './App.css';
import { Navigate } from "react-router-dom";

function App(props){
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          {/* Redirect index to /search */}
          <Route index element={<Navigate to="/search" replace/>}/>
          }/>
          <Route path="/game" element={<Game/>}/>
          <Route
            path="/search"
            element={
              <SearchForm/>
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;