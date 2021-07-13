import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

export default function NavBar(){ 
  return(
    <nav className="navbar">
          <Link to="/home"><h1>Mascotas</h1></Link>
          <Link to="/home/create">Create</Link>
          <Link to="/">Landing</Link>
      
    </nav>
  )
}