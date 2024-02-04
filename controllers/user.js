const User = require('../models/user');
const bcrypt = require('bcryptjs');
const countries = require('countries-list');
var jwt = require('jsonwebtoken');

const generateToken = (email) => {
    return jwt.sign({ email }, "JWT_SECRET");
  };
  

exports.Postuser = async (req, res) => {
    try {
        const {email, country, fname, lname, address, phoneno, gender, dob, password, cpassword} = req.body;

        if (password !== cpassword) {
            return res.status(401).json({ message: 'Password and confirm password do not match' });
          }

         


          const UserData = new User({
            email : email,
            country : country,
            fname : fname,
            lname : lname,
            address : address,
            phoneno : phoneno,
            gender : gender,
            dob : dob,
            password: bcrypt.hashSync(password, 10),
            cpassword: bcrypt.hashSync(cpassword, 10),
        });

        console.log(UserData)
        const newUserData = await UserData.save();

        var token = generateToken(email);

        res.send({
            success : true,
            error : false,
            message : "Signup user Successfully!!",
            card : newUserData,
            token:token
        })
    } catch (error) {
        res.send({
            success : false,
            error : true,
            message : "error in uploading card"
           })
    }
};

exports.userGet = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving contacts' });
    }
  };