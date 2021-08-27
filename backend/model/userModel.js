const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    userId: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    cart: [{
        bookId: {
            type: String,
        },
        quantity: {
            type: Number
        }
    }]
});

const userModel = new mongoose.model('User', dataSchema);

module.exports = userModel
