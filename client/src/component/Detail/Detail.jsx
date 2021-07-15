import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getDogDetalle} from '../../action/index.js';
import rina from '../../imagenes/rina.jpg'
import gif from '../../imagenes/huellaPerro.gif';
import './detail.css';

export default function Detail(props){
  const dispatch = useDispatch();
  const dogId = props.match.params.id;
  console.log("DOGID", dogId)

  useEffect(() => {
    dispatch(getDogDetalle(dogId));
  },[dispatch, dogId]);

  const detail = useSelector(state => state.detail);
  const cargando = useSelector(state => state.cargando);
  console.log("DETALLE",detail)

  return (
    <div className="detalle">
      <div className="detalle1">
        { cargando? <h1>Loading....</h1>:
        <div key={detail.id}>
          <div>
          {
            detail.bd? <img className="imagen2" src={rina} alt="not found imagen"/>
            : <img className="imagen2" src={detail.imagen} alt="not found imagen"/>
          }
          </div>
          <div className="bodydetalle">
              <h2 className="name">{detail.name}</h2>
              <h3>Weight: {detail.peso} kg</h3>
              <h3>Height: {detail.altura} cm</h3>
              <h3>Life span: {detail.life}</h3>
              <h3>Breed: {detail.raza}</h3>
              <div>
                <h3>Temperaments:</h3>
                <p>
                {
                  detail.bd? detail.temperaments.map(temp => temp.name).join(", ")
                  : detail.temperaments
                }
                </p>
              </div>
          </div> 
        </div>
        }
      </div>
      <div className="huella1">
        <img  src={gif} alt="huella" width="250" height="300"/>
      </div>
    </div>
  )
}