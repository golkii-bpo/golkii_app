const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const errorPage = express.Router();

module.exports = errorPage;

errorPage
.route('/')
.get(errorHandler(async (req,res)=>{
    return res.render('page/error',{title:'Pagina no encontrada'});
}));