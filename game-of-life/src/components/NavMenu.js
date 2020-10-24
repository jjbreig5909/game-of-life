import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './NavMenu.css';

function NavMenu() {

    const [open, setOpen] = useState(false)
    
    function handleClick() {
        setOpen(!open)
    }

    return (
        <div className = "nav-container">
            <div id="nav-icon2"
            className = {open ? "open" : ""}
            onClick = {handleClick}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div id="nav-menu"
            className = {open ? "open" : ""}>
            <Link
            className="nav-link home-link"
            exact
            to="/"
            >Play
            </Link>
            <Link
            className="nav-link"
            exact
            to="/rules"
            >About
            </Link>
            </div>
            
        </div>
    )
}

export default NavMenu;