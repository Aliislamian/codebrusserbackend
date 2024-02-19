const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require("cors");
require('dotenv').config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
const mongoDBUrl = process.env.MONGO_DB;
const allowedOrigins = [
  'https://codebrosserwebfrontend.onrender.com',
  // 'http://localhost:3000',
  // 'http://localhost:3001',
  'http://localhost:8000'
];
app.use(
  cors({
    origin: allowedOrigins, // Pass the array of allowed origins
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.use(cors());

app.options("*", cors());

const User = require('./routes/user');
const categries = require('./routes/categries');
const subcategries = require('./routes/subcategries');
const products = require('./routes/products');
const filter = require('./routes/filter');
const personalinformation = require('./routes/shop/personalinformation');
const search = require('./routes/search');
const Imagesshop = require('./routes/shop/image');
const Cart = require('./routes/cart');
const message = require('./routes/message');


app.use(User);
app.use(categries);
app.use(subcategries);
app.use(products);
app.use(filter);
app.use(personalinformation);
app.use(search);
app.use(Imagesshop);
app.use(Cart);
app.use(message);

  app.get("/", (req, res) => {
    console.log("Testing");
    res.json({ message: "Hi there, welcome to this tutorial." });
  });

  mongoose.connect(mongoDBUrl)
  .then(() => {
    app.listen(8000, () => {
      console.log('Server is running on port 8000');
      console.log('DB Connected!');
    });
  })
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
  });