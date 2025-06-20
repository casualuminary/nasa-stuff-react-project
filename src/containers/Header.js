import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import React from "react";


const Header = () => {

  return (
    <div>
      <header className="row mb-4 header">
        <nav className="col-2 navbar nav-left justify-content-center">
          <Link to="/">
            <FaHome size={30}/>
          </Link>
        </nav>

        <div className="col-8 mt-3 mb-2">
          <div className="navtitle mb-4"><Link to="/">Welcome to the Universe</Link></div>
          <div className="emily"><a href="https://emilyjennings.github.io">An App Made by Emily</a></div>
        </div>

        <nav className="col-2 navbar d-flex justify-content-center">
          <Link to="/game">
            <button className="btn btn-lg btn-dark border-0" type="submit">Play !</button>
          </Link>
        </nav>
      </header>
    </div>
  );

}

export default Header
