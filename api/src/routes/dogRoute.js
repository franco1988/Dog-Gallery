const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const axios = require('axios').default;
const { Dog, Temperament } = require("../db.js");

const router = Router();

const data = async () => {
  const apiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const dogs = apiDogs.data.map(dog => {
      //console.log("TEMPERAMENT", dog.temperament)
      return {
        id: dog.id,
        name: dog.name,
        altura: dog.height.metric,
        peso: dog.weight.metric,
        life: dog.life_span,
        raza: dog.breed_group,
        imagen: dog.image.url,
        temperament: dog.temperament,
        bd: false
      }
  });
  //console.log("API DE DOGS",dogs);
  return dogs;
}

router.get('/', async (req, res, next) => {
  const apiDogs = await data();
  //console.log("API DE DOGS",apiDogs);
  const bdDogs = await Dog.findAll();
  const dogsTotal = bdDogs.concat(apiDogs);
  const namedog = req.query.name;
  if(namedog){
    try {
      var perro = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${namedog}%`
          }
        },
        include: [Temperament]
      });
      if(!perro.length){
          perro = apiDogs.filter(dog => {
            if(dog.name.toLowerCase().includes(namedog.toLowerCase())){
              return dog;
          } 
          })
      }
      return res.json(perro);
    } catch (error) {
      next(error);
    }
  }
  return res.json(dogsTotal);
});

router.get('/:id', async(req, res , next) => {
  const idparams = req.params.id;
  console.log("ID", idparams)
  const apiDogs = await data();
  try {
    var dog = apiDogs.filter(dog => (dog.id) === parseInt(idparams));
    console.log("DOG", dog)
    if(!dog.length){
      dog = await Dog.findByPk(id, {include: Temperament});
      if(!dog.length){ return res.status(500).send("no hay dog")}
      return res.json(dog);
    }
    return res.json(dog);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const {name, altura, peso, life, temperament, raza} = req.body;
    
    let tempCreate = temperament;
    try {
        const dog = await Dog.create({
            name,
            altura,
            peso,
            life,
            raza
        });
        const temp = await Temperament.findAll();
        while(tempCreate.length !== 0){
            for (let i = 0; i < temp.length; i++) {
                if(tempCreate[0].toLowerCase() === temp[i].name.toLowerCase()){
                    await dog.addTemperaments(temp[i].id);
                }
            }
            tempCreate.shift();
        }
        res.json(dog);
    } catch (error) {
        next(error);
    }
});

module.exports = router;