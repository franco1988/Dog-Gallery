import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getDogDetalle} from '../../action/index.js';
import rina from '../../imagenes/rina.jpg'
//import './datail.css'

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
      { cargando? <h1>Loading....</h1>:
      <div>
        <div>
        {
          detail[0].bd? <img className="imagen2" src={rina} alt="not found imagen"/>
          : <img className="imagen2" src={detail[0].imagen} alt="not found imagen"/>
        }
        </div>
        <div className="bodydetalle">
            <h2>{detail[0].name}</h2>
            <h3>Peso: {detail[0].peso} kg</h3>
            <h3>Altura: {detail[0].altura} cm</h3>
            <h3>Años de Vida: {detail[0].life}</h3>
            <div>
              <h3>Temperamento:</h3>
              {
                detail[0].bd? detail[0].temperament.map(temp => <p>{temp}</p>)
                : (<p>{detail[0].temperament}</p>)
              }
            </div>
        </div>
      </div>
      }
    </div>
  )
}