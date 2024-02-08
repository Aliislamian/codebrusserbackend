const express = require('express');
const router = express.Router();
const upload = require("../middlewire/upload");
const cloudinary = require('cloudinary').v2;
const Products = require('../models/products');

cloudinary.config({
  cloud_name: 'dyferab2s',
  api_key: '953374558833214',
  api_secret: 'dsWhHAMdlwsZeXGMHyhZcUgc6M4',
  secure: true
});

router.post('/api/product', upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a record in the database with the Cloudinary URL, title, and description
    const newProducts = new Products({
      url: result.secure_url,
      title: req.body.title,
      heading: req.body.heading,
      description: req.body.description,
      detials: req.body.detials,
      color: req.body.color,
      size: req.body.size,
      price: req.body.price,
      Properties: req.body.Properties,
      subcategory: req.body.subcategory,
    });

    // Save the record to the database
    const savedProducts = await newProducts.save();

    // Send the Cloudinary URL and savedAbout to the client
    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: savedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});




// router.put('/api/product/:id', async (req, res) => {
//     try {
//       const productId = req.params.id;
//       const { title, heading, description, detials, color, size, price, subcategory } = req.body;
  
//       // Update the record in the database
//       const updatedProduct = await Products.findByIdAndUpdate(productId, {
//         title: title,
//         heading: heading,
//         description: description,
//         detials: detials,
//         color: color,
//         size: size,
//         price: price,
//         subcategory: subcategory
//       }, { new: true });
  
//       if (!updatedProduct) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found."
//         });
//       }
  
//       // Send the updated product to the client
//       res.status(200).json({
//         success: true,
//         message: "Product updated successfully.",
//         data: updatedProduct
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         message: "Error updating product."
//       });
//     }
//   });
  


// // GET request to fetch all data


router.get('/api/products', async (req, res) => {
  try {
    const productsdata = await Products.find();
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

router.delete('/delete-product/:id', async (req, res) => {
  try {
    // Find the record by ID and remove it
    const deletedAbout = await Products.findByIdAndDelete(req.params.id);

    // Check if the document with the specified ID exists
    if (!deletedAbout) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Send a success response to the client
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});

module.exports = router;
