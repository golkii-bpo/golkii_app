//configuracion de Variables de Desarrollo
require('dotenv/config');

//Importan las librerias
const express = require('express');
const ejsLayouts = require("express-ejs-layouts");
const config = require('config');
const path = require('path');
const morgan = require('morgan');
const winston = require('winston');

//Variables de Servidor
const app = express();
const router = require('./routes/route');

//Configure Logger Transport
const logger = winston.createLogger({
    transports:[
        new winston.transports.File({filename:path.join(__dirname,'../server/log/logger.log')})
    ]
});

//View Config
app.set('views',path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.set('layout', path.join(__dirname, '/views/layouts/main-layout'));
app.use(ejsLayouts);

console.log(app.get('env'));
//Status Resources
app.use('/resources',express.static(path.join(__dirname,'/public'))); //agregar resource
app.use('/modules', express.static(path.join(__dirname, './modules'))); //agregar resource
app.use('/middleware', express.static(path.join(__dirname,'./middleware'))); //agregar resource
app.use('/directives', express.static(path.join(__dirname, './directives'))); //agregar resource

//Logger
app.use(morgan('dev'));

//Router
app.use('/app',router);
app.use('*',(req,res)=>{
    return res.redirect('/app/error');
});

//Middleware
app.use((err,req,res,next)=>{
    logger.error(err.message);
    return res.status(500).send(err.message);
})

//Server
app.listen(config.PORT,()=>{
    if(app.get('env') === 'development'){
        console.log(`Aplicacion se esta ejecutando en el puerto ${config.PORT}`);
    }
});