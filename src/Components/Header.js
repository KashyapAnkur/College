import React from 'react';
import {NavLink} from 'react-router-dom';

function Header() {

    return (
        <div className="header">
            <NavLink className="links" exact to="/">Home</NavLink>
            <NavLink className="links" to="/userform">Add users</NavLink>
            <NavLink className="links" to="/userlist">Show users</NavLink>
        </div>
    )
}

export default Header;