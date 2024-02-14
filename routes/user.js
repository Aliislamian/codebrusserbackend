const express = require('express');
const routes = express.Router();
const userController = require('../controllers/user');
// const upload =require('../middleware/upload');

routes.post('/api/user',  userController.Postuser);
routes.post('/api/forgotpassword',  userController.forgotPasswordPost);
routes.post('/api/verify-otp',  userController.verifyOTPAndResetPassword);
routes.post('/api/reset-password',  userController.ResetPassword);
// routes.post('/login',  userController.Login);
routes.get('/api/user-get', userController.userGet);
routes.patch('/update-user/:id', userController.updateUser);
// routes.delete('/services-delete/:id', bannerController.deleteservices);

module.exports = routes;