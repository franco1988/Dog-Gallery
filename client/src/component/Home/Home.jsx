import React, { useState,  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogName } from '../../action/index.js';
import Dog from '../Dog/Dog.jsx';


export default function Home(){
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs);
  const dogName = useSelector(state => state.dogName);
  const temperament = useSelector(state => state.temperament);

  const [perros, setPerros] = useState([]);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [ordenar, setOrdenar] = useState("");
  const [filter, setFilter] = useState("");
  console.log("DOGS", dogs)
  console.log("PERROS", perros)
  useEffect(() => {
    setPerros(dogs)
    console.log("1")
  })
  useEffect(() => {
    console.log("2")
    if(search.length > 0){
      dispatch(getDogName(search));
      setPerros(dogName);
    }else {setPerros(dogs)}
  },[dispatch,search]);

  useEffect(() => {
    console.log("3")
    let dog = [];
    setPage(0);
    if(ordenar === "az"){
      dog = perros.sort((a, b) => {return a.name > b.name ? 1 : -1 });
      //console.log('az', dogs)
    }
    if(ordenar === "za"){
      dog = perros.sort((a, b) => { return a.name < b.name ? 1 : -1 });
      //console.log('za', game)
    }
    if(ordenar === "peso"){
      dog = perros.sort((a, b) => b.peso - a.peso);
      //console.log('rating', game)
    }
    if(ordenar === " "){
      dog = dogs;
    }
    setPerros([...dog])
  }, [ordenar]);

  function handleFilter(e){
    console.log("4")
    setFilter(e.target.value);
    if(filter === " "){
      return setPerros(dogs);
    }
    let filtro = dogs.filter(e => {
     return e.temperament === undefined? " " : e.temperament.includes(filter)? e : "";
    });
    setPerros(filtro);
  }

  function handlePrev(){
    if(page > 0){return setPage(page - 1)}
    return setPage(0);
  }

  function handleNext(){
    let pageMax = Math.ceil(dogs.length / 8 - 1);
    if(pageMax < 0){return setPage(0)}
    if(page < pageMax){ return setPage(page + 1)}
    return setPage(pageMax);
  }

  return (
    <div>
      <div>
        <input type="search" placeholder="Name...." onChange={e => setName(e.target.value)} />
        <button onClick={() => setSearch(name)}>Search</button>
      </div>
      <div className="list">
        <select onClick={e => setOrdenar(e.target.value)}>
          <option value=" ">Sort dog breeds by:</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="peso">Weight</option>
        </select>
      </div>
      <div>
        <select onClick={e => handleFilter(e)}>
          <option value=" ">Filter by temperament:</option>
          {
            temperament? temperament.map(e => <option value={e.name}>{e.name}</option>)
            : <option>Cargando...</option>
          }
        </select>
      </div>
      <div className="games">
        {
        perros.length > 0? perros.slice(page * 8, page * 8 + 8).map((dog) => 
          <Dog key={dog.id}
          name={dog.name} imagen={dog.imagen} raza={dog.raza} altura={dog.altura} 
          peso={dog.peso} temperamento={dog.temperament} id={dog.id} bd={dog.bd}/>
          ) : <p>Cargando....</p>
        }
      </div>
      <div className="list">
        <button value="prev" onClick={handlePrev} 
          disabled={page <= 0}>prev</button>
        <p className="pagina" > {page + 1} </p>
        <button value="next" onClick={handleNext} 
          disabled={perros.slice(page * 8, page * 8 + 8).length < 8}>next</button>
      </div>
    </div>
  )
}