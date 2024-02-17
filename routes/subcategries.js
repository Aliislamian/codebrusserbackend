const express = require('express');
const routes = express.Router();
const SubcategriesController = require('../controllers/categries/subcategries');
const subcategries = require('../models/subcategries');
const upload = require("../middlewire/upload"); // Corrected middleware import path
const cloudinary = require('../middlewire/cloudinary'); // Import cloudinary config
const categories = require('../models/catogries');

// const upload =require('../middleware/upload');

// routes.post('',  categriesController.Postcategries);
routes.post('/api/sub-categries', upload.array('files', 10), async (req, res) => {
    try {
        // const {category} = req.body;
        // Upload images to Cloudinary
        const uploader = async (path) => await cloudinary.uploader.upload(path, { folder: "Images" });
  
        const urls = [];
        const files = req.files; 
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath.secure_url); // Push the secure URL to the array
        }
  
        // Create a record in the database with the Cloudinary URLs, title, and other data
        const newProducts = new subcategries({
            files: urls,
            title:req.body.title,
            category: req.body.category
           
        });
  
        // Save the record to the database
        const savedProducts = await newProducts.save();
      const subcategory = await categories.findById(req.body.category);

  
        // Send the Cloudinary URLs and saved product data to the client
        res.status(200).json({
            success: true,
            message: "Uploaded!",
            // data: savedProducts,
            data: {
                subcategory: savedProducts,
                category: subcategory // Include the subcategory data in the response
              },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
  });

  routes.get('/api/get-subcategries', async (req, res) => {
    try {
      const productsdata = await subcategries.find();
      res.status(200).json({
        success: true,
        message: "Fetched data successfully",
        data: productsdata,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  });
// routes.post('/api/sub-categries',  SubcategriesController.Postsubcategries);
// routes.get('/api/get-subcategries',  SubcategriesController.getsubcategries);
routes.get('/api/sub-categries/:id', SubcategriesController.getbyidsubcategres);
routes.patch('/api/sub-categries-update/:id', SubcategriesController.updatesubcategries);
routes.delete('/api/sub-categries-delete/:id', SubcategriesController.deletesubcategries);

module.exports = routes;