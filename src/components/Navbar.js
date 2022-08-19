import React, { Fragment } from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () => (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="navbar-brand p-3">
            Note-App
        </div>

        <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">Information</NavLink>
        </li>
      </ul>
    </nav>
)