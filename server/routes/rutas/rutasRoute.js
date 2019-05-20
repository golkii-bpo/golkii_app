const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const rutasRoute = express.Router();

module.exports = rutasRoute;

rutasRoute
.get('/', errorHandler(async (req, res) => {
    return res.render('page/rutas/rutas',{title: 'AppGolkii - Rutas'});
}));
rutasRoute
    .get('/:id([0-9]+)', errorHandler(async (req, res) => {
    
        return res.render('page/rutas/ruta', { title: 'AppGolkii - Rutas', id: req.params.id});
}));
rutasRoute
.get('/agregar', errorHandler(async (req, res) => {
    return res.render('page/rutas/agregar', { title: 'AppGolkii - Rutas' });
}));
