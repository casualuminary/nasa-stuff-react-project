import React, { Component } from 'react';
import { Link } from "react-router-dom";

function PlayAgain({onClickHandler}){

  return (
    <div className="row">
      <div className="col-6 d-flex justify-content-end">
        <button className="btn btn-lg btn-dark btn-custom p-3" onClick={onClickHandler}>Again!</button>
      </div>
      <div className="col-6 d-flex justify-content-start">
        <Link to="/">
          <button className="btn btn-lg btn-dark btn-custom p-3" type="submit">Go Back</button>
        </Link>
      </div>
    </div>
  );
}
export default PlayAgain;