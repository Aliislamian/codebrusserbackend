const express = require('express');
const router = express.Router();
const upload = require("../middlewire/upload");
const cloudinary = require('cloudinary').v2;
const Cart = require('../models/cart');
const Product = require('../models/products');
const userinformation = require('../models/userinformation');
const shipping = require('../models/shipping');
const authJwt = require("../middlewire/auth"); // Import the authJwt middleware
// const stripe = require('stripe')('sk_test_51NETQVLRDc0a3gYhJlQUGW6FdHssqkLq6mp9XgCUrlVc7JBEHwPgivVk87KUPdX30AS6JDACZN751dtl1LhxGT6600VQ3eE9mX');




cloudinary.config({
  cloud_name: 'dyferab2s',
  api_key: '953374558833214',
  api_secret: 'dsWhHAMdlwsZeXGMHyhZcUgc6M4',
  secure: true
});

router.post('/api/cart', authJwt.verifyToken, upload.single('image'), async (req, res) => {
  try {
    // Assuming req.body contains the product_id
    const { product_id } = req.body;
    const userId = req.user_id;
    // Fetch the details of the selected product from the 'cards' collection
    const selectedProduct = await Product.findById(product_id);

    if (!selectedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Save a new entry in the 'Cart' collection
    const newCartItem = new Cart({
      product_id,
      url: selectedProduct.url,
      title: selectedProduct.title,
      title: selectedProduct.color,
      title: selectedProduct.size,
      price: selectedProduct.price,
      cartQuantity: 1,
      subtotal: selectedProduct.price,
      userId: userId, // Associate the cart item with the user
    });

    await newCartItem.save();

    res.status(200).json({
      success: true,
      message: "Product added to the cart successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});


router.post('/api/userinformation', authJwt.verifyToken, async (req, res) => {
  try {
    const newAbout = new userinformation({
      country: req.body.country,
      username: req.body.username,
      email: req.body.email,
      phoneno: req.body.phoneno,  
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

router.get('/api/userinformation-get/:id',  async (req, res) => {
  try {
    // Get the user ID from the authenticated token
    const userId = req.params.id;

    // Find the user information based on the user ID
    console.log("first", userId)
    const userInformation = await userinformation.findById( userId );
    console.log("User Information:", userInformation);
    


    if (!userInformation) {
      return res.status(404).json({
        success: false,
        message: "User information not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "User information fetched successfully",
      data: userInformation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});
router.post('/api/shipping', authJwt.verifyToken, async (req, res) => {
  try {
    const newAbout = new shipping({
      country: req.body.country,
      username: req.body.username,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      phoneno: req.body.phoneno,

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

router.get('/api/shipping-get/:id',  async (req, res) => {
  try {
    // Get the user ID from the authenticated token
    const userId = req.params.id;

    // Find the user information based on the user ID
    console.log("first", userId)
    const Shipping = await shipping.findById( userId );
    console.log("User Information:", Shipping);
    


    if (!Shipping) {
      return res.status(404).json({
        success: false,
        message: "User information not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "User information fetched successfully",
      data: Shipping,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

// router.post('/checkout', authJwt.verifyToken, async (req, res) => {
//   try {

//     const customer = await stripe.customers.create({
//       name:req.body.name,
//         email:req.body.email, 
//     });
//     const customerId = customer.id;
//     console.log("=====>>>", customerId);
//     const {
//       card_Name,
//       card_ExpYear,
//       card_ExpMonth,
//       card_Number,
//       card_CVC,
//     } = req.body;

//     const card_token = await stripe.tokens.create({
//       card: {
//         name: card_Name,
//         number: card_Number,
//         exp_year: card_ExpYear,
//         exp_month: card_ExpMonth,
//         cvc: card_CVC,
//       },
//     });
//     console.log("card_token", card_token);


//     const card = await stripe.customers.createSource(customerId, {
//       source: `${card_token.id}`,
//     });

//     console.log(card_token);
   
//     const cardId = card.id


//     const createCharge = await stripe.charges.create({
//       receipt_email: 'tester@gmail.com',
//       amount: parseInt(req.body.amount) * 100, // amount*100
//       currency: 'usd',
//       card: cardId,
//       customer: customerId,
//     });

//     // // Save the amount to MongoDB
//     // const newCharge = new customers({
//     //   amount: req.body.amount,
//     // });
//     const _id = createCharge.id;
//       console.log(_id);
//       const updatedCart = await Cart.findOneAndUpdate(
//         { userId: req.user_id },
//         { order_status: 'pending' },
//         { new: true } // To get the updated cart object
//       );
  
//       if (!updatedCart) {
//         return res.status(404).json({
//           success: false,
//           message: "Cart not found",
//         });
//       }
//     res.status(200).send({ card:card_token });

// } catch (error) {
//     res.status(400).send({success:false,_id:null});
// }
// });

router.get('/api/get-subtotal', authJwt.verifyToken, async (req, res) => {
    try {
      const userId = req.user_id;
  
      // Find all cart items associated with the user
      const cartItems = await Cart.find({ userId }).populate('product_id');
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Cart is empty",
        });
      }
  
      // Calculate the total by summing up the subtotals of all items
      const subtotal = cartItems.reduce((acc, cartItem) => acc + cartItem.subtotal, 0);
  
      res.status(200).json({
        success: true,
        message: "Subtotal fetched successfully",
        data: {
          subtotal,
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

  router.patch('/api/cart/:id', authJwt.verifyToken, async (req, res) => {
    try {
      const userId = req.user_id;
      const cartItemId = req.params.id;
      const { cartQuantity, order_status } = req.body;

      console.log("object====>>>",userId );
      console.log("object",cartItemId );
  
      // Fetch the cart item to be updated
      const cartItem = await Cart.findOne({ _id: cartItemId, userId });
  
      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }
  
      // Update cart quantity and recalculate subtotal
      cartItem.cartQuantity = cartQuantity;
      cartItem.subtotal = cartQuantity * cartItem.price;
      cartItem.order_status = order_status || cartItem.order_status;

  
      // Save the updated cart item
      await cartItem.save();
  
      res.status(200).json({
        success: true,
        message: "Cart item updated successfully",
        data: cartItem,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  });
  
  
  router.get('/api/get-cart', authJwt.verifyToken, async (req, res) => {
    try {
      const userId = req.user_id;
  
      // Find all cart items associated with the user
      const cartItems = await Cart.find({ userId }).populate('product_id');
  
      res.status(200).json({
        success: true,
        message: "Fetched data successfully",
        data: cartItems,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  });

  router.delete('/api/delete-item/:id', authJwt.verifyToken, async (req, res) => {
    try {
      const userId = req.user_id;
      const cartItemId = req.params.id;
  
      // Find the record by ID and user ID and remove it
      const deletedCartItem = await Cart.findOneAndDelete({ _id: cartItemId, userId });
  
      if (!deletedCartItem) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Cart item deleted successfully",
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
