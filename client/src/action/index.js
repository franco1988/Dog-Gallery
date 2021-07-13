import axios from 'axios';

export const GET_DOG = "GET_DOG";
export const GET_DOG_NAME =  "GET_DOG_NAME";
export const GET_DOG_DETALLE = "GET_DOG_DETALLE";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const POST_DOG = "POST_DOG";
export const CARGANDO = "CARGANDO";

export const getDogAll = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_DOG,
      payload: response.data
    })
  }
};

export const getDogName = (dog) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/dogs?name=${dog}`);
    return dispatch({
      type: GET_DOG_NAME,
      payload: response.data
    })
  }
};

export const getDogDetalle = (id) => {
  return async (dispatch) => {
    dispatch({type: CARGANDO})
    const response = await axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: GET_DOG_DETALLE,
      payload: response.data
    })
  }
};

export const getTemperament = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/temperament");
    let dog = response.data.sort((a,b) => {
      return a.name > b.name ? 1 :
      a.name < b.name ? -1 : 0
    });
    return dispatch({
      type: GET_TEMPERAMENT,
      payload: dog
    })
  }
};

export const postDog = (dog) => {
  return async () => {
          await axios.post("http://localhost:3001/dogs", dog)
  }
}