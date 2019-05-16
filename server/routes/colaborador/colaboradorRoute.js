const express = require('Express');
const errorHandler = require('../../middleware/errorHandler');
const agregarColaboradorRoute = express.Route();

module.exports = agregarColaboradorRoute;

agregarColaboradorRoute
    .get('/colaborador/agregar', errorHandler(async(req,res)=>{
        return res.status(200).render('page/colaborador/agregar',{title: 'AppGolkii'})
    }))