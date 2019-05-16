const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const rutasRoute = express.Router();

module.exports = rutasRoute;

rutasRoute
    .get('/rutas', errorHandler(async (req, res) => {
        return res.status(200).render('page/rutas/ruta', { title: 'AppGolkii' });
    }));