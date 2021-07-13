import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getDogAll, getTemperament } from '../../action/index';
import huella from '../../imagenes/huella.gif';

export default function Landing(){
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("LANDING")
    dispatch(getDogAll());
    dispatch(getTemperament());
  },[dispatch])

  return (
    <div>
      <h1>MASCOTAS</h1>
      <Link to="/home">
        <img src={huella} alt="huella" width="300" height="350"/> 
      </Link>
    </div>
  )
}