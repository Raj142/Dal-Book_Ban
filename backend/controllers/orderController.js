// Author: Dhruvilkumar Savliya

const orderModel = require("../model/orderModel");

exports.find = async (req, res) => {


    try {
        if (req.query.id) {
            const id = req.query.id;

            orderModel.findById(id)
                .then(data => {
                    if (!data) {
                        res.status(404).send({ message: "Not found book with id " + id })
                    } else {
                        res.send(data)
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: "Erro retrieving book with id " + id })
                })

        }
        else {
            const orders = await orderModel.find();
            res.status(200).json({
                status: 'success',
                orders
            });
        }

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}


exports.update = async (req, res) => {
    const orderFromDb = await orderModel.find({ ref: req.body.ref });

    const status = req.body.status;

    orderFromDb[0].status = status;


    orderFromDb[0].save();
    res.status(200).json({
        status: "success",
        message: "Profile Updated",
    });

    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
}