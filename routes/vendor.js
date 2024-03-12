const express = require('express');
const routes = express.Router();
const userController = require('../controllers/vendor');
// const upload =require('../middleware/upload');

routes.post('/api/vendorsignup',  userController.Postvendor);
routes.post('/api/loginvendor',  userController.login);
// routes.post('/api/login-admin',  userController.loginadmin);
// routes.post('/api/login-vendor',  userController.loginvendor);
// routes.post('/api/forgotpassword',  userController.forgotPasswordPost);
// routes.post('/api/verify-otp',  userController.verifyOTPAndResetPassword);
// routes.post('/api/reset-password',  userController.ResetPassword);
// routes.get('/api/user-get', userController.userGet);
// routes.patch('/update-user/:id', userController.updateUser);

module.exports = routes;