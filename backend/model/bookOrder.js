let mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {

    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        desc: { type: String, required: true },
        price: { type: Number, required: true },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Book',
        },
      },
    ],
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('bookOrders', orderSchema)

module.exports = Order;