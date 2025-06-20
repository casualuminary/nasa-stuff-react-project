import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class PlayAgain extends Component {

  reloadPage = () => {
    document.location.reload(true)
  }

  render() {

    return (
      <div className="row">
        <div className="col-6 d-flex justify-content-end">
          <button className="btn btn-lg btn-dark btn-custom p-3" onClick={this.reloadPage}>Again!</button>
        </div>
        <div className="col-6 d-flex justify-content-start">
          <Link to="/">
            <button className="btn btn-lg btn-dark btn-custom p-3" type="submit">Go Back</button>
          </Link>
        </div>
      </div>
    );
  }
}
