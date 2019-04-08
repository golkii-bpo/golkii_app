const express = require('express');
const mainRouter = require('./main/mainRoute');
const errorPage = require('./404/404');

const router = express.Router();

router.use('/',mainRouter);
router.use('/error',errorPage);

module.exports = router;


