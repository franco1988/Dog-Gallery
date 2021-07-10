import React from 'react';
import { Link } from 'react-router-dom';

export default function Dog({id, name, peso, altura, temperamento, imagen, raza}){
  return (
    <div className="game">
      <Link to={`/detalle/${id}`}>
        <img className="imagen" src={imagen} alt="not found imagen"/>
      </Link>
        <div className="game-body">
          <h3>{name}</h3>
          <p>Peso: {peso} kg</p>
          <p>Altura: {altura} cm</p>
          <p>Raza: {raza}</p>
          <p>Temperamentos: {temperamento}</p>
        </div>
    </div>
  )
}