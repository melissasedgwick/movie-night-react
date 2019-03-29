import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          <h2>Movie Night</h2>
        </Link>
        <div className="right menu">
        <Link to="/" className="item">
          <h2>All Movie Lists</h2>
        </Link>
        </div>
      </div>
    );
  };
};

export default Header;
