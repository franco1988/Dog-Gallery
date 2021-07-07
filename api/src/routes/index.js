const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoute = require('./dogRoute.js');
const temperamentRoute = require('./temperamentRoute.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRoute);
router.use('/temperament', temperamentRoute);


module.exports = router;
