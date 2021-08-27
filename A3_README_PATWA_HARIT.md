# Assignment 3



## Front-End work: 
I have submitted assignment 3 with my feature Cart Management, Here I have created a home page, which displays some headings. After that, there is a search bar that will search the book for the user. After searching the book, suppose you have searched "Book" in the search box, It will show the books having the 'book' keyword in the title. After that, there is an option to add the book to the cart. After adding the book to the cart. Users can view the cart, remove the book from the cart. Lastly, users can checkout from the cart too. 

## Back-End work:

I have created bookController and bookModel for getting the data from the MongoDB clusters. After that using a basic HTML table structure, I have shown the books to the user in 3 x 3 format. Users can add books to the cart, if the user logs out and re-logins, the cart items will be stored in the database, so They will be automatically retrieved back.
You can search the "book' keyword in the searchbox.

I have to implement the Cart Management feature which has five tasks:
* *Search and Browse Book*
* *Add to Cart*
* *View Cart*
* *Remove from Cart*
* *Checkout Cart*

# Details

* *Date Created*: 15 July 2021

* *Last Modification Date*: 20 July 2021

* *App URL*: <https://group14-s21--thedalbookbarn.herokuapp.com>
*  Back-end server URL: <https://group14-thedalbookbarn-bkend.herokuapp.com>
* *Repo URL*: <https://github.com/samikshasalgaonkar/Group14_TheDalBookBarn>
* *Branch URL*: <https://github.com/samikshasalgaonkar/Group14_TheDalBookBarn/tree/add_to_cart_Feature>



## Authors


* [Harit Rakeshbhai Patwa](hr495851@dal.ca) - *(Developer)*



## Getting Started



### Prerequisites



1. I have used BrowserRouter as Router, Switch, Route, Redirect 'react-router-dom for routing.
2. I have used react-bootstrap components from https://react-bootstrap.github.io/
3. I have used nodeJs and cors dependencies please install them as well.

Please install dependencies according to that.



### Installing


* Installing Router: run 'npm install react-router-dom on the terminal on the project directory.
* Installing Bootstrap: run 'npm install react-bootstrap bootstrap@4.6.0' on the terminal on the project directory.
* Install CORS and npm node install.

### Steps

#### Front-End

* I have created multiple components for the react app such as Header, Book, Cart, Checkout, Home
* For the Book Component, I have not linked to a database, rather used file 'src/components/Books/BooksData.json' where I had stored dummy data and parsed it with the JSON parser and displayed it on Cart Component. Used React-Router Dom for routing to different pages.
* I had focused on the responsiveness of the page, none of the components of the page gets hidden while resizing the page.
* Payment Gateway and Search button on Homepage is still in progress.
* I am providing the references for the two image files used during the application development. (1)book.jpeg (2) cart logo

#### Back-End
* I have created bookControl.js which will fetch the books from the database. And there is a method called getParticularBook to retrieve a particular book from the server using a searchbox.

```
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

```

* I have created bookModel, which will store the data into the mongoDb database and maintain the schema.


```
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
```
* Modified routes file according to the routes.
line number: 25,26

```
route.get('/books/:searchText', bookController.displayBookList);
route.get('/books/book/:id', bookController.getParticularBook);
```

* Modified Header1.js file for getting user's email at the navbar drop-down heading.

line number: 59
```
 title={localStorage.getItem("email")}
```

## Running the tests

* The application has been deployed on <https://group14-s21--thedalbookbarn.herokuapp.com> and can be tested here. 



## Test roadmap:

* There will be a Home page open when we run Heroku link. After that we have to click on the Books button, It will redirect towards the Search Page of our application. There will be a number of 3x3 grids(All are responsive). We can add the product to the cart by clicking the 'add to cart button'. It will increase the cart size by one. We can click on the cart and view the cart. We can also remove items from the cart by clicking the remove button. The cart shows the total amount with the item quantity. Lastly, We can click on the Checkout button, It will automatically redirect us towards the payment gateway. 

* We are storing each user's cart, so if the user logs out and re-logins again. The cart will be restored since it will be stored on the MongoDB database.




* The webpage passes W3C front-end validations. The front-end validation test was done on <https://validator.w3.org/nu/?doc=https%3A%2F%2Fgroup14-s21--thedalbookbarn.herokuapp.com%2F>



* I have tested the responsiveness of the website by inspecting the elements in various sizes, in all formats no components were overlapping or getting hidden.



## Deployment



* I have used "https://github.com/mars/create-react-app-buildpack" buildpack for deploying the Heroku app.

* I have used nodeJs buildpack for deploying the server of our web application.

## Files that I work on: 

### Frontend:
Group14_TheDalBookBarn\frontend\src\components\Books\Book.css
Group14_TheDalBookBarn\frontend\src\components\Books\Book.js
Group14_TheDalBookBarn\frontend\src\components\Books\BooksData.json
Group14_TheDalBookBarn\frontend\src\components\Cart\Cart.js
Group14_TheDalBookBarn\frontend\src\components\Cart\Cart.css
Group14_TheDalBookBarn\frontend\src\components\Checkout\Checkout.js
Group14_TheDalBookBarn\frontend\src\components\Header1\Header.js
Group14_TheDalBookBarn\frontend\src\components\Header1\Header.css
Group14_TheDalBookBarn\frontend\src\components\Home\Home.js
Group14_TheDalBookBarn\frontend\src\components\Home\Home.css
Group14_TheDalBookBarn\frontend\src\components\Header.js
Group14_TheDalBookBarn\frontend\src\components\Header.css

## Backend:
Group14_TheDalBookBarn\backend\controllers\bookController.js
Group14_TheDalBookBarn\backend\Model\bookModel.js



## Built With



* [React](https://reactjs.org/) - The frontend framework used is React

* [Bootstrap](https://react-bootstrap.github.io/) - Bootstrap was used to build the Navigation Bar and Modals used in the feature.
* [NodeJs](https://nodejs.org/en/) - NodeJs was used to configure the backend environment of the web application.
* [W3C validations](https://validator.w3.org/nu/?doc=https%3A%2F%2Fa1haritpatwa.herokuapp.com%2FHome)





## Sources Used



* [Background-image](https://unsplash.com/photos/DCzpr09cTXY) - Books.jpeg which was used in Book.js
* [Background-image](http://www.w3.org/2000/svg) - cart icon for header.js




