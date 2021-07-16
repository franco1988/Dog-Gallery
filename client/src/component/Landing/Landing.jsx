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
      <div>
        <Link to="/home">
          <h1 className="pets">PET GALLERY</h1>
        </Link>
      </div>
      <div className="huella">
        <img  src={gif} alt="huella" width="250" height="300"/> 
      </div>
    </div>
  )
}