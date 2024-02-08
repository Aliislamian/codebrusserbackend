const express = require('express');
const routes = express.Router();
const SubcategriesController = require('../controllers/categries/subcategries');
// const upload =require('../middleware/upload');

routes.post('/api/sub-categries',  SubcategriesController.Postsubcategries);
routes.get('/api/get-subcategries',  SubcategriesController.getsubcategries);
routes.get('/api/sub-categries/:id', SubcategriesController.getbyidsubcategres);
routes.patch('/api/sub-categries-update/:id', SubcategriesController.updatesubcategries);
routes.delete('/api/sub-categries-delete/:id', SubcategriesController.deletesubcategries);

module.exports = routes;