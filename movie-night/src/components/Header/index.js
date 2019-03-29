import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../GoogleAuth';

class Header extends React.Component {
  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item" id="movie-night-link">
          <h2>Movie Night</h2>
        </Link>
        <div className="right menu">
        <Link to="/" className="item" id="all-lists-link">
          <h2>All Movie Lists</h2>
        </Link>
        <GoogleAuth />
        </div>
      </div>
    );
  };
};

export default Header;
