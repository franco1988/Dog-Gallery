import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getDogAll, getTemperament } from '../../action/index';
import gif from '../../imagenes/huellaPerro.gif';
import './landing.css';

export default function Landing(){
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("LANDING")
    dispatch(getDogAll());
    dispatch(getTemperament());
  },[dispatch])

  return (
    <div className="landing">
      <div className="pets">
        <h1>PET GALLERY</h1>
      </div>
      <div className="huella">
        <Link to="/home">
          <img  src={gif} alt="huella" width="250" height="300"/> 
        </Link>
      </div>
    </div>
  )
}