import React, { useState,  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Dog from '../Dog/Dog.jsx';

export default function Home(){
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs);

  const [page, setPage] = useState(0);

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
      <div className="games">
        {
        dogs.length > 0? dogs.slice(page * 8, page * 8 + 8).map((dog) => 
          <Dog key={dog.id}
          name={dog.name} imagen={dog.imagen} raza={dog.raza} altura={dog.altura} 
          peso={dog.peso} temperamento={dog.temperament} id={dog.id}/>
          ) : <h1>Cargando....</h1>
        }
      </div>
      <div className="list">
          <button value="prev" onClick={handlePrev}>anterior</button>
          <p className="pagina" > Pagina {page + 1} </p>
          <button value="next" onClick={handleNext}>siguiente</button>
        </div>
    </div>
  )
}