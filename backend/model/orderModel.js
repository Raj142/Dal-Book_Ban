// Author: Dhruvilkumar Savliya


const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    date: {
        type: String
    },
    status: {
        type: String
    },
    ref: {
        type: String
    }
});

const orderModel = new mongoose.model('Order', dataSchema);

module.exports = orderModel
