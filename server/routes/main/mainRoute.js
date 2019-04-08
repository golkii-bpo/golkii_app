const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const mainRouter = express.Router();

module.exports = mainRouter;
mainRouter
.route('/')
.get(errorHandler(
    async (req,res) =>{
        res.status(200).render('page/dashboard',{title:'AppGolkii'});
    })
);