const Vendor = require('../models/vendorsignup');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


exports.Postvendor = async (req, res) => {
    try {
        const {email, username,  password} = req.body;

       
          
          const UserData = new Vendor({
            email : email,
            
            username : username,
           
            password: bcrypt.hashSync(password, 10),
        });

        let token = jwt.sign({ id: UserData._id }, "JWT_SECRET", {
          expiresIn: 86400, // 24 hours
        });
        console.log(UserData)
        const newUserData = await UserData.save();




        res.send({
            success : true,
            error : false,
            message : "Signup Vendor Successfully!!",
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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
  
        // Find user by email
        const user = await Vendor.findOne({ email });
  
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        // If credentials are valid, generate JWT token
        let token = jwt.sign({ id: user._id }, "JWT_SECRET", {
          expiresIn: 86400, // 24 hours
        });
  
  
        res.status(200).json({ success: true, message: "Logged in successfully", user: user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

