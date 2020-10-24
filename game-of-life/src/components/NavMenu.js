import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './NavMenu.css';

function NavMenu() {

    const [open, setOpen] = useState(false)
    
    function handleClick() {
        setOpen(!open)
    }

    return (
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
    )
}

export default NavMenu;