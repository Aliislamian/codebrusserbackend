const express = require('express');
const router = express.Router();
const upload = require("../../middlewire/upload");
const cloudinary = require('cloudinary').v2;
const Image = require('../../models/shop/image');

cloudinary.config({
  cloud_name: 'dob8jz2lg',
  api_key: '775856616847855',
  api_secret: '7gjsf51FHGhdx2YgALD5MBGiX1c',
  secure: true
});

router.post('/image', upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a record in the database with the Cloudinary URL, title, and description
    const newAbout = new Image({
      url: result.secure_url,
     
    });

    // Save the record to the database
    const savedAbout = await newAbout.save();

    // Send the Cloudinary URL and savedAbout to the client
    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: savedAbout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});


// GET request to fetch all data
router.get('/image', async (req, res) => {
  try {
    const aboutData = await Image.find();
    res.status(200).json({
      success: true,
      message: "Fetched data successfully",
      data: aboutData,
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
