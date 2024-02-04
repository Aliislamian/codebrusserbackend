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
  'http://localhost:3000',
  'http://localhost:3001',
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


app.use(User);

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