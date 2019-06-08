const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const personaRoute = express.Router();

module.exports = personaRoute;

personaRoute
.get('/busqueda-completa',errorHandler(async(req,res) =>{
    return res.status(200).render('page/persona/BusquedaCompleta',{title:'AppGolkii'});
}));