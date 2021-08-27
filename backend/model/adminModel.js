const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    ref: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    catagory: {
        type: String
    },
    stock: {
        type: String,
    }
});

const adminModel = new mongoose.model('Admin', dataSchema);

module.exports = adminModel
