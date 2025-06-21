import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Game from './components/Game'
import SearchForm from './components/SearchForm'
import Header from './containers/Header'
import './App.css';

function App(props){
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route index element={
            <SearchForm/>
          }/>
          <Route path="/game" element={<Game/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;