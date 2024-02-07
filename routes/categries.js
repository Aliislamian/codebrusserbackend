const express = require('express');
const routes = express.Router();
const categriesController = require('../controllers/categries/categries');
// const upload =require('../middleware/upload');

routes.post('/api/categries',  categriesController.Postcategries);
// routes.post('/login',  userController.Login);
// routes.get('/api/user-get', userController.userGet);
// routes.patch('/services/:id', bannerController.updateservices);
// routes.delete('/services-delete/:id', bannerController.deleteservices);

module.exports = routes;