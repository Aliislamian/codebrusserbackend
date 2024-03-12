const User = require('../models/user');
const bcrypt = require('bcryptjs');
const countries = require('countries-list');
var jwt = require('jsonwebtoken');

const nodemailer = require("nodemailer");
const sendgridTransport = require('nodemailer-sendgrid-transport');
var otps ;
let transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.EMAIL_KEY
    }
  })
);

const sendOTPForgotPassoword = async (email) => {
  try {
      otppassword = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log("otp=============.>>>>>>>", otppassword);

    const msg = {
      to: email,
      from: "aliislamian123@gmail.com",
      subject: "Authorization Code for Plano App",
      html: `
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Authorization Code</title>
          <style>
            /* Add your custom styles here */
            /* Example: */
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              padding: 20px;
              text-align: center;
            }
            .logo {
              max-width: 100px; /* Adjust the size as needed */
              margin-bottom: 20px;
            }
            .otp-text {
              font-size: 18px;
              margin-bottom: 20px;
            }
            .otp-code {
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
            }
            .note {
              color: #999999;
              margin-top: 10px;
            }
            .new{
              color: #008000	;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p class="new">Forgot Password</p>
            <p class="otp-text">You recently requested to reset your password for your Plano App.              
            </p>
            <p class="otp-text">Use the OTP below to reset it.
            </p>
            <p class="otp-code">${otppassword}</p>
            <p class="note">If you do not use Plano App or did not attempt to access your Plano, please ignore this email or contact support if you have questions.</p>
          </div>
        </body>
        </html>
      `,
    };

    // Add return statement here
    return await transporter.sendMail(msg);

  } catch (error) {
    console.log(error);
    throw new Error("Error sending authorization code email");
  }
};





exports.Postuser = async (req, res) => {
    try {
        const {email, country, fname, lname, address, phoneno, gender, dob, password, cpassword} = req.body;

        if (password !== cpassword) {
            return res.status(401).json({ message: 'Password and confirm password do not match' });
          }
          
          const UserData = new User({
            email : email || "",
            country : country || "",
            fname : fname || "",
            lname : lname || "",
            address : address || "",
            phoneno : phoneno || "",
            gender : gender || "",
            dob : dob || "",
            password: bcrypt.hashSync(password, 10),
            cpassword: bcrypt.hashSync(cpassword, 10),
        });

        let token = jwt.sign({ id: UserData._id }, "JWT_SECRET", {
          expiresIn: 86400, // 24 hours
        });
        console.log(UserData)
        const newUserData = await UserData.save();




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


exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });

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

exports.userGet = async (req, res) => {
    try {
      const users = await User.find();
       const userCount = users.length; // Get the count of users
    res.status(200).json({ userCount, users }); // Send the user count along with the users
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving contacts' });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
        const { email, fname } = req.body;
        const userId = req.params.id; // Assuming you have the user ID in the request params

        // Find the user by ID
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
          console.log(user.fname, fname);
        // Update the user data
        user.email = email || user.email; // If email is provided in the request body, update it; otherwise, keep the existing value
        user.fname = fname || user.fname; // Same for fname

        // Save the updated user data
        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: "User data updated successfully!",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            message: "Error updating user data"
        });
    }
};

exports.forgotPasswordPost = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success:false, message: 'User not found', body:null });
    }

  //   // Generate a new OTP and update it in the user's record
  //   const newOTP = `${Math.floor(1000 + Math.random() * 900000)}`;
  //   user.otp = newOTP;
  //   await user.save();

    // Send OTP verification email
    await sendOTPForgotPassoword(email);



    res.status(200).json({success:true, message: 'OTP sent successfully', body: otppassword });
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: 'Error sending OTP for password reset', body:null});
  }
};

exports.verifyOTPAndResetPassword = async (req, res) => {
    try {
    const { otp } = req.body;

    // Find the user by email
    // const user = await User.findOne({ email });

    // Check if the OTP matches
    if (otp === otppassword) {
      // Hash and update the new password
      // const hashedPassword = bcrypt.hashSync(newPassword, 10);
      // user.password = hashedPassword;
      // user.otp = null; // Clear the OTP
      // await user.save();

      res.status(200).json({ success:true, message: 'OTP is success', body:otppassword });
    } else {
      res.status(401).json({ success:false, message: 'Invalid OTP' , body:null });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};


exports.ResetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ success:false, message: "User not found" , body:null});
    }
        console.log(user)
  
      // Hash and update the new password
      const hashedPassword = bcrypt.hashSync(password, 10);
      user.account_passowrd = hashedPassword;
      // user.otp = null; // Clear the OTP
      await user.save();

      res.status(200).json({success:true, message: 'Password reset Successfuly', body: user});
 
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: 'Error resetting password', body:null });
  }
};