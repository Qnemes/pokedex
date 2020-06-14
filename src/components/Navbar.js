import React from 'react';
import logo from '../stylesheets/img/logo.png'

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar__img-wrapper">
            <img src={logo} alt="Pokemon logo" className="navbar__logo" />
        </div>
        </div>
    );
}

export default Navbar;