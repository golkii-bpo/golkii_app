const express = require('express');
const mainRouter = require('./main/mainRoute');
const errorRoute = require('./errors/404');
const personaRoute = require('./persona/personaRoute');
const loginRoute = require('./main/loginRoute');

const router = express.Router();

router.use('/',mainRouter);
router.use('/error',errorRoute);
router.use('/persona',personaRoute);
router.use('/login',loginRoute);

module.exports = router;


