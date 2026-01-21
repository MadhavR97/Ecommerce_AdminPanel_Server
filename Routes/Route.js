const express = require('express');
const route = express.Router();
const { AddUser, LoginUser, ForgotPassword, verifyOTP, resetPassword, GetUsers, EditUser, DeleteUser } = require('../controllers/AuthCtl');
const { AddProduct, GetProduct, DeleteProduct, UpdateProduct, GetProductById } = require('../controllers/productCtl');
const { AddToCart, GetCart, UpdateCart, DeleteCartItem } = require('../controllers/cartCtl');
const { AiAssistant } = require('../controllers/AiAssistant');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken')

// User Auth Route
route.post('/AddUser', AddUser)
route.put('/updateUser/:id', verifyToken, EditUser)
route.delete('/deleteUser/:id', verifyToken, DeleteUser)
route.post('/loginUser', LoginUser)
route.get('/getUsers', verifyToken, GetUsers)

// Product Route
route.post('/products', verifyToken, upload, AddProduct)
route.get('/products', GetProduct)
route.delete('/products/:id', verifyToken, DeleteProduct)
route.get('/products/:id', verifyToken, GetProductById)
route.put('/products/:id', verifyToken, upload, UpdateProduct)

// Cart Route
route.post('/cart', verifyToken, AddToCart)
route.get('/cart/:userId', verifyToken, GetCart)
route.put('/cart/update', verifyToken, UpdateCart)
route.delete('/cart/delete/:productId', verifyToken, DeleteCartItem)

// Forgot Password Route
route.post('/forgotPassword', ForgotPassword)
route.post('/otpVerification', verifyOTP)
route.post('/resetPassword', resetPassword)

// Ai Assistant Route
route.post('/aiAssistant', verifyToken, AiAssistant);

module.exports = route;