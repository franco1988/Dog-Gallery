import React from 'react';
import { Link } from 'react-router-dom';
import Rina from '../../imagenes/Rina.jpg'
import Nila from '../../imagenes/Nila.jpg';
import Pepe from '../../imagenes/Pepe.jpg';
import './dog.css';

export default function Dog({id, name, temperaments,raza, imagen,peso, bd}){
  let foto;
  if(imagen === "Rina"){
    foto = Rina;
  } else {
    if(imagen === "Nila"){
      foto = Nila;
    }else {
      foto = Pepe;
    }
  }

  return (
    <div className="dog">
      <Link to={`/home/detail/${id}`}>
      {
        bd? <img className="imagen" src={foto} alt="not found imagen"/>
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