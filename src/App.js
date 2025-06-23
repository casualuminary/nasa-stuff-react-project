import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router";

import Game from './components/Game'
import SearchForm from './components/SearchForm'
import Header from './components/Header'
import './App.css';
import { Navigate } from "react-router";

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