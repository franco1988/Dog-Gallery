import {GET_DOG, GET_DOG_NAME, GET_DOG_DETALLE, GET_TEMPERAMENT, CARGANDO} from '../action/index.js';

const initialState = {
  dogs: [],
  temperament: [],
  detail: {},
  cargando: false
};

export default function reducer(state = initialState, action){
  if(action.type === GET_DOG){
    return {
      ...state,
      dogs: action.payload
    }
  }
  if(action.type === GET_DOG_NAME){
    return {
      ...state,
      dogs: action.payload
    }
  }
  if(action.type === GET_DOG_DETALLE){
    return {
      ...state,
      cargando: false,
      detail: action.payload
    }
  }
  if(action.type === GET_TEMPERAMENT){
    return {
      ...state,
      temperament: action.payload
    }
  }
  if(action.type === CARGANDO){
    return {
      ...state,
      cargando: true
    }
  }
  return state;
}