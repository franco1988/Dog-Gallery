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
      return {
        name: dog.name,
        altura: dog.height.metric,
        peso: dog.weight.metric,
        life: dog.life_span,
        raza: dog.breed_group,
        imagen: dog.image.url,
        temperament: dog.temperament
      }
  });
  //console.log("API DE DOGS",dogs);
  return dogs;
}

router.get('/', async (req, res) => {
  const apiDogs = await data();
  //console.log("API DE DOGS",apiDogs);

  try {
    let hayDogs = await Dog.findAll();
    if(!hayDogs.length){
      await Dog.bulkCreate(apiDogs);
      
        let temperamento = apiDogs.map(async dog => {
          let tempe = dog.temperament.split(",");
          for(let i=0; i < tempe.length; i++){
           let [t , create] = await Temperament.findOrCreate({
              where: {
                name: tempe[i]
              }
            })
            await t.setDog(dog.id);
          }
        })
      
    }
  } catch (error) {
    console.log(error);
  }

  if(req.query.name){
    try {
      let perro = await Dog.findAll({
        where: {
          name: {
            [Op.ilike]: `%${req.query.name}%`,
          }
        },
        include: [Temperament]
      });
      return res.json(perro);
    } catch (error) {
      console.log(error);
    }
  }

  try {
    let dog = await Dog.findAll({
      limit: 8,
      offset: req.query.page,
      order:[[`${req.query.tipo}`, req.query.order]], // tipo= raza o peso  - order= ASC DESC
      include: {model: Temperament}
    });
    return res.json(dog);
  } catch (error) {
    console.log(error);
  }
  
});

//router.get('/:id', getDetail);
//router.post('/', addVideogame);

module.exports = router;