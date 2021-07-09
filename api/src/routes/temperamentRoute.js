const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const axios = require('axios').default;
const { Dog, Temperament, dog_temp } = require("../db.js");

const router = Router();

const data = async () => {
  const apiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const dogs = apiDogs.data.map(dog => {
      //console.log("TEMPERAMENT", dog.temperament)
      return {
        id: dog.id,
        temperament: dog.temperament
      }
  });
  //console.log("API DE DOGS",dogs);
  return dogs;
}

router.get('/', async(req, res) => {
  let hayTemp = await Temperament.findAll();
  console.log("HAY 1")
  if(!hayTemp.length){
    const apiDogs = await data();
    let lista = apiDogs[0].temperament;
    console.log("LISTA1")
    for(let i=1; i < apiDogs.length; i++){
      lista = lista.concat(", " + apiDogs[i].temperament);
    }
    let array = lista.split(", ");
    console.log("ARRAY")
    array = array.map(e => {
      return {name: e}
    })
    await Temperament.bulkCreate(array);
    
    hayTemp = await Temperament.findAll();
    console.log("HAY 2")
  } 
  return res.json(hayTemp)
})

module.exports = router;