let express = require('express');

// create a reference to the model
let Book = require('../model/bookModel');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            if(req.params.searchText != "-empty-"){
                bookList = bookList.filter((book)=>{
                    if(book.Title.toLowerCase().includes(req.params.searchText.toLowerCase())){
                        return true
                    }
                    return false
                })
            }
            res.send({"books": bookList})      
        }
    });
}

module.exports.getParticularBook = (req, res, next) => {
    Book.findById(req.params.id , (err, Book) => {
        res.send({"book":Book})
    })          
}
