const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const rutasRoute = express.Router();

module.exports = rutasRoute;
let title = "AppGolkii - Base";
rutasRoute
    .get('/agregar-perfil', errorHandler(async (req, res) => {
        return res.render('page/base/addDBProfile', { title: title });
    }));