import React from 'react';
import { Link } from 'react-router-dom';
import './dog.css';

export default function Dog({id, name, temperamento, imagen,peso, bd}){
  return (
    <div className="dog">
      <Link to={`/home/detail/${id}`}>
        <img className="imagen" src={imagen} alt="not found imagen"/>
      </Link>
      <div className="dog-body">
        <h3>{name}</h3>
        <p>{peso}</p>
        <p>Temperaments:</p>
        {
          bd? temperamento.map(temp => <p>{temp}</p>)
          : (<p>{temperamento}</p>)
        }
      </div>
    </div>
  )
}