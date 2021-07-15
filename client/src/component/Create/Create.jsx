import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postDog } from '../../action';

export function validate(input){
  let error = {};
  if(!input.name){ error.name = 'Please enter a name'}
  if(!input.altura){ error.altura = 'Please enter a height'}
  if(!input.peso){ error.peso = 'Please enter a weight'}
  if(!input.raza){ error.raza = 'Please enter a breed'}
  if(!input.life){ error.life = 'Please enter a life span'}
  if(!input.temperaments.length){ error.temperaments = 'Please enter a temperament'}
  return error;
}

export default function Create(){
  const dispatch = useDispatch();
  const temperament = useSelector(state => state.temperament);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: '',
    altura: '',
    peso: '',
    raza: '',
    life: '',
    temperaments: []
  });

  function handleInput(e){
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    console.log("SETINPUT", input)
  }

  function handleTemperaments(e){
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value]
    });
    console.log("SET TEMPERAMENT", input.temperaments)
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(postDog(input));
    console.log("POST", input);

    setInput({
      name: '',
      altura: '',
      peso: '',
      raza: '',
      life: '',
      temperaments: []
    });
    document.getElementById("form").reset();
  }

  return (
    <form id="form" className="form" onSubmit={handleSubmit}>
      <h2>Create your pet</h2>
      <div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={input.name} placeholder="Name..."
            onChange={handleInput} className={error.name && 'danger'}/>
            {error.name && (<p className="danger">{error.name}</p>)}
        </div>
        <div>
          <label>Height:</label>
          <input type="text" name="altura" value={input.altura} placeholder="Height..."
            onChange={handleInput} className={error.altura && 'danger'}/>
            {error.altura && (<p className="danger">{error.altura}</p>)}
        </div>
        <div>
          <label>Weight:</label>
          <input type="text" name="peso" value={input.peso} placeholder="Weight..."
            onChange={handleInput} className={error.peso && 'danger'}/>
            {error.peso && (<p className="danger">{error.peso}</p>)}
        </div>
        <div>
          <label>Breed:</label>
          <input type="text" name="raza" value={input.raza} placeholder="Breed..."
            onChange={handleInput} className={error.raza && 'danger'}/>
            {error.raza && (<p className="danger">{error.raza}</p>)}
        </div>
        <div>
          <label>Life span:</label>
          <input type="text" name="life" value={input.life} placeholder="Life span..."
            onChange={handleInput} className={error.life && 'danger'}/>
            {error.life && (<p className="danger">{error.life}</p>)}
        </div>
      </div>
      <div>
        <label>Temperament:</label>
        {error.temperaments && (<p className="danger">{error.temperaments}</p>)}
        <select onClick={e => handleTemperaments(e)}>
          <option ></option>
          {
            temperament? temperament.map(e => <option value={e.name}>{e.name}</option>)
            : <option>Loading...</option>
          }
          </select>
      </div>
      <input className="agregar" type="submit" value="Submit"/>
    </form>
  )
}