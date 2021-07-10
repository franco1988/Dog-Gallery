import React from "react";
import { Link } from "react-router-dom";
//import './navbar.css';

export default function NavBar(){ 
  return(
    <header className="navbar">
      <nav>
        <ul className="list">
          <li className="list-item">
              <Link to="/home">
                <h1>Mascotas</h1>
              </Link>
            <Link to="/home/create">Create</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}