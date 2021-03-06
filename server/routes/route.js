const express = require('express');
const mainRouter = require('./main/mainRoute');
const loginRoute = require('./main/loginRoute');
const errorRoute = require('./errors/404');
const personaRoute = require('./persona/personaRoute');
const colaboradorRoute = require('./colaborador/colaboradorRoute')
const rutaRoute = require('./rutas/rutasRoute')

const router = express.Router();

router.use('/',mainRouter);
router.use('/login',loginRoute);
router.use('/error',errorRoute);
router.use('/persona',personaRoute);
router.use('/colaborador',colaboradorRoute);
router.use('/ruta',rutaRoute);

module.exports = router;


