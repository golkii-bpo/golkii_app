const express = require('Express');
const errorHandler = require('../../middleware/errorHandler');
const agregarColaboradorRoute = express.Router();

module.exports = agregarColaboradorRoute;

agregarColaboradorRoute
.get('/agregar', errorHandler(async(req,res)=>{
    return res.render('page/colaborador/agregar',{title: 'AppGolkii'})
}))