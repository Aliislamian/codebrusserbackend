const express = require('express');
const routes = express.Router();
const personalinformation = require('../../controllers/shop/personalinformation');
const Shop = require('../../models/shop/shopinformation')
const upload = require('../../middlewire/upload');
const cloudinary = require('../../middlewire/cloudinary');

// const upload =require('../middleware/upload');

routes.post('/api/vendor',  personalinformation.Postvendor);
// routes.post('/api/shop',  personalinformation.shoppost);

routes.post('/api/shop', upload.array('files', 10), async (req, res)=> {
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
        const newProducts = new Shop({
            files: urls,
            shopname: req.body.shopname,
            companyname:req.body.companyname,
            categries:req.body.categories,
            brand:req.body.brand,
            phoneno:req.body.phoneno,
            email:req.body.email,
            address:req.body.address
           
        });
  
        // Save the record to the database
        const savedProducts = await newProducts.save();
    //   const subcategory = await categories.findById(req.body.category);

  
        // Send the Cloudinary URLs and saved product data to the client
        res.status(200).json({
            success: true,
            message: "Uploaded!",
            // data: savedProducts,
            Shop: savedProducts,
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
})



routes.get('/api/vendor-get', personalinformation.vendorGet);
routes.get('/api/shop-get', personalinformation.shopGet);
// routes.patch('/services/:id', bannerController.updateservices);
// routes.delete('/services-delete/:id', bannerController.deleteservices);

module.exports = routes;