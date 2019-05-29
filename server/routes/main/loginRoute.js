const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const loginRouter = express.Router();
    
module.exports = loginRouter;

loginRouter
.route('/')
.get(errorHandler(
async (req,res) =>{
    res.render('page/login/login', { title: 'App Golkii', layout:'layouts/login-layout'});
})
);
loginRouter
.route('/forgot')
.get(errorHandler(
async (req,res) => {
    res.render('page/login/forgot', {title: 'App Golkii', layout: 'layouts/login-layout'});
}));
loginRouter
.route('/reset')
.get(errorHandler(
async (req,res) => {
    res.render('page/login/reset', {title: 'App Golkii', layout: 'layouts/login-layout'});
}));