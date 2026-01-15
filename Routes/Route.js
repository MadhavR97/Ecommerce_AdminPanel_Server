const express = require('express');
const route = express.Router();
const { AddUser, LoginUser, ForgotPassword, verifyOTP, resetPassword, GetUsers, EditUser, DeleteUser } = require('../controllers/AuthCtl');
const { AddProduct, GetProduct, DeleteProduct, UpdateProduct, GetProductById } = require('../controllers/productCtl');
const { AddToCart, GetCart, UpdateCart, DeleteCartItem } = require('../controllers/cartCtl');
const { AiAssistant } = require('../controllers/AiAssistant');
const upload = require('../middleware/upload');

// User Auth Route
route.post('/AddUser', AddUser)
route.put('/updateUser/:id', EditUser)
route.delete('/deleteUser/:id', DeleteUser)
route.post('/loginUser', LoginUser)
route.get('/getUsers', GetUsers)

// Product Route
route.post('/products', upload, AddProduct)
route.get('/products', GetProduct)
route.delete('/products/:id', DeleteProduct)
route.get('/products/:id', GetProductById)
route.put('/products/:id', upload, UpdateProduct)

// Cart Route
route.post('/cart', AddToCart)
route.get('/cart/:userId', GetCart)
route.put('/cart/update', UpdateCart)
route.delete('/cart/delete/:productId', DeleteCartItem)

// Forgot Password Route
route.post('/forgotPassword', ForgotPassword)
route.post('/otpVerification', verifyOTP)
route.post('/resetPassword', resetPassword)

// Ai Assistant Route
route.post('/chat', AiAssistant)

module.exports = route;