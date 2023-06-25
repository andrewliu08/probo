import React from 'react';

import LogoFinal from "./Logo-final.png";
import LogoText from "./Logo-text.png";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={LogoFinal} alt="Logo" className="logo" />
        <img src={LogoText} alt="Logo-text" className="logotext" />
      </div>
      <div className="navbar-right">
        <button className="button">Button 1</button>
        <button className="button">Button 2</button>
      </div>
    </nav>
  );
};