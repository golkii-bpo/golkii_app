const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const rutasRoute = express.Router();

module.exports = rutasRoute;
let title = "AppGolkii - Rutas";
rutasRoute
.get('/', errorHandler(async (req, res) => {
    return res.render('page/rutas/rutas',{title: title});
}));
rutasRoute
    .get('/:id([0-9]+)', errorHandler(async (req, res) => {
    return res.render('page/rutas/ruta', { title: title, id: req.params.id});
}));
rutasRoute
.get('/agregar', errorHandler(async (req, res) => {
    return res.render('page/rutas/agregar', { title: title });
}));
rutasRoute
    .get('/:id([a-z]+)/modificar', errorHandler(async (req, res) =>{

    return res.render('page/rutas/ruta',{title: title})
}))
