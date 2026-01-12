const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    roll: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    resetOtp: {
        type: Number
    },
    resetOtpExpiry: {
        type: Date
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;