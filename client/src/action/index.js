import axios from 'axios';

export const GET_DOG = "GET_DOG";
export const GET_DOG_NAME =  "GET_DOG_NAME";
export const GET_DOG_DETALLE = "GET_DOG_DETALLE";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const POST_DOG = "POST_DOG";

export const getDogAll = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_DOG,
      payload: response.data
    })
  }
};