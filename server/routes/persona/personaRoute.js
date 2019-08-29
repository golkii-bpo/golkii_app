const express = require('express');
const errorHandler = require('../../middleware/errorHandler');
const personaRoute = express.Router();

module.exports = personaRoute;

personaRoute
    .get('/busqueda-completa',errorHandler(async(req,res) =>{
        return res.status(200).render('page/persona/BusquedaCompleta',{title:'AppGolkii'});
    })
);
personaRoute
    .get('/feedbackPersona/list/:list([0-9]+)/lead/:lead([0-9]+)/number/:phone([0-9]+)/name/:name', errorHandler(async (req, res) => {
        return res.status(200).render('page/persona/feedbackPersona', { title: 'AppGolkii - FeedbackPersona', list: req.params.list, lead: req.params.lead, phone: req.params.phone, name: req.params.name });
    })
);
personaRoute
    .get('/feedbackPersona/list/:list([0-9]+)/lead/:lead([0-9]+)/number/:phone([0-9]+)/name', errorHandler(async (req, res) => {
        return res.status(200).render('page/persona/feedbackPersona', { title: 'AppGolkii - FeedbackPersona', list: req.params.list, lead: req.params.lead, phone: req.params.phone, name: 'NOMBRE DESCONOCIDO' });
    })
);