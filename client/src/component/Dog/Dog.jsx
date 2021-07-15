import React from 'react';
import { Link } from 'react-router-dom';
import rina from '../../imagenes/rina.jpg'
import './dog.css';

export default function Dog({id, name, temperaments,raza, imagen,peso, bd}){
  return (
    <div className="dog">
      <Link to={`/home/detail/${id}`}>
      {
        bd? <img className="imagen" src={rina} alt="not found imagen"/>
        : <img className="imagen" src={imagen} alt="not found imagen"/>
      }
      </Link>
      <div className="dog-body">
        <h2 className="name">{name}</h2>
        <p>Weight: {peso} kg</p>
        <p>Breed: {raza}</p>
        <p>Temperaments:</p>
        <p>
        {
          bd? temperaments.map(temp => temp.name).join(", ")
          : temperaments
        }
        </p>
      </div>
    </div>
  )
}