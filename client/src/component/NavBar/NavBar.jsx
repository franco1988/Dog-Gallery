import React from "react";
import { Link } from "react-router-dom";
import hue from '../../imagenes/huellablanca.png';
import './navbar.css';

export default function NavBar(){ 
  return( 
    <nav className="navbar">
      <div className="listnav">
        <Link className="link1" to="/home/create">Create</Link>
        <img className="linkimg" src={hue} alt="huella" width="40" height="40"/>
        <Link className="link2" to="/home">PET GALLERY</Link>
        <Link className="link3" to="/">Landing</Link>
      </div>
    </nav>
  )
}