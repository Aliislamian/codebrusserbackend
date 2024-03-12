const express = require('express');
const routes = express.Router();
const userController = require('../controllers/user');
// const upload =require('../middleware/upload');

routes.post('/api/user',  userController.Postuser);
routes.post('/api/login',  userController.login);
routes.post('/api/login-admin',  userController.loginadmin);
routes.post('/api/login-vendor',  userController.loginvendor);
routes.post('/api/forgotpassword',  userController.forgotPasswordPost);
routes.post('/api/verify-otp',  userController.verifyOTPAndResetPassword);
routes.post('/api/reset-password',  userController.ResetPassword);
routes.get('/api/user-get', userController.userGet);
routes.patch('/update-user/:id', userController.updateUser);

module.exports = routes;