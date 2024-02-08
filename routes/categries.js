const express = require('express');
const routes = express.Router();
const categriesController = require('../controllers/categries/categries');
// const upload =require('../middleware/upload');

routes.post('/api/categries',  categriesController.Postcategries);
routes.get('/api/get-categries',  categriesController.getcategries);
routes.get('/api/categries/:id', categriesController.getbyidcategres);
routes.patch('/api/categries-update/:id', categriesController.updatecategries);
routes.delete('/categries-delete/:id', categriesController.deletecategries);

module.exports = routes;