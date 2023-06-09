import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h3>Back to Home</h3>
      </Link>
    </header>
  );
};

export default Header;
