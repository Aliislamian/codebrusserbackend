const express = require('express');
const routes = express.Router();
const categriesController = require('../controllers/categries/categries');
const Categries = require('../models/catogries');
const Subcategory = require('../models/subcategries');
const upload = require("../middlewire/upload"); // Corrected middleware import path
const cloudinary = require('../middlewire/cloudinary'); // Import cloudinary config

// const upload =require('../middleware/upload');

// routes.post('',  categriesController.Postcategries);
routes.post('/api/categries', upload.array('files', 10), async (req, res) => {
    try {
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
        const newProducts = new Categries({
            files: urls,
            title:req.body.title,
            subcategory: req.body.subcategory
           
        });
  
        // Save the record to the database
        const savedProducts = await newProducts.save();

      const subcategory = await Subcategory.findById(req.body.subcategory);

  
        // Send the Cloudinary URLs and saved product data to the client
        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: savedProducts,
            data: {
                category: savedProducts,
                subcategory: subcategory // Include the subcategory data in the response
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

  routes.get('/api/get-categries', async (req, res) => {
    try {
      const productsdata = await Categries.find();
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
// routes.get('/api/get-categries',  categriesController.getcategries);
routes.get('/api/categries/:id', categriesController.getbyidcategres);
routes.patch('/api/categries-update/:id', categriesController.updatecategries);
routes.delete('/api/categries-delete/:id', categriesController.deletecategries);

module.exports = routes;