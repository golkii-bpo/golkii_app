const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const errorPage = express.Router();

module.exports = errorPage;

errorPage
.route('/')
.get(errorHandler(async (req,res)=>{
    return res
    .status(200)
    .render('page/errors/PageNotFound',{title:'Pagina no encontrada',layout:'layouts/error-layout'});
}));