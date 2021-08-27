let mongoose = require('mongoose');

const schema  = {
    "bookId": String,
    "Title": String,
    "Description": String,
    "Genre": String,
    "Price" : Number,
}

let bookModel = mongoose.Schema(schema , { collection: 'Book' });
module.exports = mongoose.model('Book', bookModel);