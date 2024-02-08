const express = require('express');
const routes = express.Router();
const personalinformation = require('../../controllers/shop/personalinformation');
// const upload =require('../middleware/upload');

routes.post('/api/vendor',  personalinformation.Postvendor);
routes.post('/api/shop',  personalinformation.shoppost);
routes.get('/api/vendor-get', personalinformation.vendorGet);
routes.get('/api/shop-get', personalinformation.shopGet);
// routes.patch('/services/:id', bannerController.updateservices);
// routes.delete('/services-delete/:id', bannerController.deleteservices);

module.exports = routes;