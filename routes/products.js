const express = require('express');
const router = express.Router();
const upload = require("../middlewire/upload"); // Corrected middleware import path
const cloudinary = require('../middlewire/cloudinary'); // Import cloudinary config
const Products = require('../models/products');
const Subcategories = require('../models/subcategries')

cloudinary.config({
  cloud_name: 'dyferab2s',
  api_key: '953374558833214',
  api_secret: 'dsWhHAMdlwsZeXGMHyhZcUgc6M4',
  secure: true
});

router.post('/api/product', upload.array('files', 10), async (req, res) => {
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
      const newProducts = new Products({
          files: urls,
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

      const subcategory = await Subcategories.findById(req.body.subcategory);

      // Send the Cloudinary URLs and saved product data to the client
      res.status(200).json({
          success: true,
          message: "Uploaded!",
          data: {
            product: savedProducts,
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
