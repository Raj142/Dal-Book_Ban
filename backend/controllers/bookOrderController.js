const Order = require('../model/bookOrder');
const User = require('../model/userModel');

exports.addOrder = async (req, res) => {
    try {

        const { address, city, country, email, isPaid, paymentMethod, totalPrice, orderItems } = req.body;
        
        let order = new Order({
            address,
            city, 
            country,
            email,
            isPaid,
            paymentMethod,
            totalPrice,
            orderItems
        });

        await order.save()
            .then(order => {
                res.send({
                    status: 'success',
                    message: 'Order has been placed',
                    orderId: order._id
                });
            })
            .catch(err => {
                res.send({
                    status: 'failed',
                    message: err
                })
            })
    } catch (err) {
        console.log(err)
    }
};

exports.getOrder = (req, res, next) => {
    Order.find((err, orderList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"orders": orderList})      
        }
    });
}