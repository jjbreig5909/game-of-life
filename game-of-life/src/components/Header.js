import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
    return(
        <nav className="header-container">
            <Link
            className="nav-link"
            exact
            to="/bio"
            >Bio
            </Link>
            <Link
            className="nav-link home-link"
            exact
            to="/"
            >Play The Game
            </Link>
            <Link
            className="nav-link"
            exact
            to="/rules"
            >Rules
            </Link>
        </nav>
    )
}

export default Header