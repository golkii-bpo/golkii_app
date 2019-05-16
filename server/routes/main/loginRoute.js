const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const loginRouter = express.Router();
    
module.exports = loginRouter;
loginRouter
.route('/')
.get(errorHandler(
    async (req,res) =>{
        res.status(200).render('page/login/login', { title: 'App Golkii', layout:'layouts/login-layout'});
    })
);
