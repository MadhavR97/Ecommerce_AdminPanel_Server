const mongoose = require('mongoose');

const productData = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    manufactureName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        enum: ['in_stock', 'unavailable', 'to_be_announced'],
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productData);

module.exports = Product;