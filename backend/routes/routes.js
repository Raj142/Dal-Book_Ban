const express = require('express');
const route = express.Router();
const userController=require('../controllers/userControllers')

const adminController= require('../controllers/adminController')

const bookController=require('../controllers/bookControllers')

const orderController=require('../controllers/orderController')

const bookOrderController=require('../controllers/bookOrderController')

route.post('/signup', userController.signup)
route.post('/login', userController.login)
route.post('/changePassword/:email', userController.changePassword);
route.post('/changeProfile/:email', userController.changeProfile);
route.put('/forgotpassword', userController.forgotpassword)

route.post('/addbook', adminController.create)
route.get('/books', adminController.find)
route.put('/books/:id',adminController.find)
route.put('/book/:id',adminController.update)
route.put('/bookes/:id',adminController.delete)


route.get('/users/:email', userController.getUser);
route.post('/users/addToCart', userController.addToCart);
route.get('/books/:searchText', bookController.displayBookList);
route.get('/books/book/:id', bookController.getParticularBook);

route.get('/order', orderController.find)
route.put('/order/:id',orderController.find)
route.put('/orderes/:id',orderController.update)

route.post('/order/add', bookOrderController.addOrder);
route.get('/past_orders', bookOrderController.getOrder);


module.exports = route
