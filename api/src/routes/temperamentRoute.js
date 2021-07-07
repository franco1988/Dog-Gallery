const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const axios = require('axios').default;
const { Dog, Temperament, dog_temp } = require("../db.js");

const router = Router();


module.exports = router;