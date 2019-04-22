const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const errorPage = express.Router();

module.exports = errorPage;

errorPage
.route('/')
.get(errorHandler(async (req,res)=>{
    return res.status.render('page/error',{title:'Pagina no encontrada'});
}));