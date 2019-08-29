const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const rutasRoute = express.Router();

module.exports = rutasRoute;
let title = "AppGolkii - Reportes";

rutasRoute
    .get('/EndToEnd/CalledCount', errorHandler(async (req, res) => {
        return res.render('page/views/EndToEnd-CalledCount', { title: title });
    }));

rutasRoute
    .get('/EndToEnd/CalledTime', errorHandler(async (req, res) => {
        return res.render('page/views/EndToEnd-CalledTime', { title: title });
    }));

rutasRoute
    .get('/DiableLeadsMenu', errorHandler(async (req, res) => {
        return res.render('page/views/DiableLeadsMenu', { title: title });
    }));
