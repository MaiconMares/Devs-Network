const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/searchController');

const routes = Router();

routes.get('/devs', DevController.mostrarDevs);
routes.get('/filter', SearchController.filtrarDevs);
routes.post('/devs', DevController.salvarDev);
routes.put('/dev_update/:id', DevController.atualizarDev);
//Declaração da rota e a função(controller) que irá lidar com ela

module.exports = routes;