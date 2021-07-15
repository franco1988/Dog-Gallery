import React, { useState,  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogName, getDogAll } from '../../action/index.js';
import Dog from '../Dog/Dog.jsx';
import './home.css';


export default function Home(){
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs);
  const temperament = useSelector(state => state.temperament);

  const [perros, setPerros] = useState([]);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [ordenar, setOrdenar] = useState("");
  const [filter, setFilter] = useState("");

  console.log("DOGS", dogs)
  console.log("TEMPERAMENT", temperament)
  console.log("PERROS", perros)

  useEffect(() => {
    console.log("2")
    setPerros(dogs);
  },[dogs])
  
  useEffect(() => {
    console.log("1")
    if(search){
      dispatch(getDogName(search));
      setPage(0);
    } else {dispatch(getDogAll())}
  },[dispatch,search]);

  useEffect(() => {
    console.log("3")
    setPage(0);
    let dog = dogs;
    if(ordenar === "az"){
      dog = dogs.sort((a, b) => {return a.raza > b.raza ? 1 : -1 });
      console.log('AZ', dog)
    }
    if(ordenar === "za"){
      dog = dogs.sort((a, b) => { return a.raza < b.raza ? 1 : -1 });
      console.log('ZA', dog)
    }
    if(ordenar === "peso"){
      dog = dogs.sort((a, b) => {return b.peso < a.peso? 1 : -1 });
      console.log('PESO', dog)
    }
    setPerros([...dog])
  }, [ordenar]);

  useEffect(() => {
    console.log("4")
    if(filter === " "){
      return setPerros(dogs);
    }
    let filtroBD = dogs.filter(e => {
      if(e.bd){
        let array = e.temperaments.filter(t => t.name === filter);
        if(array.length > 0){
          return e;
        }
      }
    })
    let filtroApi = dogs.filter(e => {
     return e.temperaments === undefined? "" : e.temperaments.includes(filter)? e : "";
    });
    let filtro = filtroBD.concat(filtroApi);
    console.log("FILTRO",filtro)
    setPerros(filtro);
  },[filter])

  function handlePrev(){
    if(page > 0){return setPage(page - 1)}
    return setPage(0);
  }

  function handleNext(){
    let pageMax = Math.ceil(dogs.length / 9 - 1);
    if(pageMax < 0){return setPage(0)}
    if(page < pageMax){ return setPage(page + 1)}
    return setPage(pageMax);
  }

  return (
    <div className="home">
      <div className="option">
        <div className="search">
          <label>Search for name:</label>
          <input type="search" placeholder="Name...." onChange={e => setName(e.target.value)} />
          <button className="botonS" onClick={() => setSearch(name)}>Search</button>
        </div>
        <div className="list">
          <label>Sort dog breeds by:</label>
          <select onClick={e => setOrdenar(e.target.value)}>
            <option value=" "></option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
            <option value="peso">Weight</option>
          </select>
        </div>
        <div className="filter">
          <label>Filter by temperament:</label>
          <select onClick={e => setFilter(e.target.value)}>
            <option value=" "></option>
            {
              temperament? temperament.map(e => <option value={e.name}>{e.name}</option>)
              : <option>Loading...</option>
            }
          </select>
        </div>
      </div>
      <div className="cards">
        <div className="dogs">
          {
          perros.length > 0? perros.slice(page * 9, page * 9 + 9).map((dog) => 
            <Dog key={dog.id}
            name={dog.name} imagen={dog.imagen} raza={dog.raza} altura={dog.altura} 
            peso={dog.peso} temperaments={dog.temperaments} id={dog.id} bd={dog.bd}/>
            ) : <p>Loading....</p>
          }
        </div>
        <div className="paginado">
          <button value="prev" onClick={handlePrev} 
            disabled={page <= 0}>prev</button>
          <p className="pagina" > {page + 1} </p>
          <button value="next" onClick={handleNext} 
            disabled={perros.slice(page * 9, page * 9 + 9).length < 9}>next</button>
        </div>
      </div>
    </div>
  )
}