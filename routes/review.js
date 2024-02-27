const express = require('express');
const routes = express.Router();
const userController = require('../controllers/review');
// const upload =require('../middleware/upload');

routes.post('/api/review',  userController.Review);
routes.get('/api/get-review',  userController.ReviewGet);
routes.get('/api/get-review/:id',  userController.ReviewGetbyid);

module.exports = routes;