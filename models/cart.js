const mongoose = require('mongoose')

const CartShema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
    url: {
        type:String
    },
    order_status: {
      type: String,
      enum: ['pending', 'deliver', 'cancelled'],
      default: null,
  },
    title: {
        type: String
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
   
    price: {
        type: Number
    },

    cartQuantity: {
        type: Number,
        default: 0,
      },
    subtotal: {
        type: Number,
        default: 0,
      },
    Total: {
        type: Number,
        default: 0,
      },

      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },


})

module.exports = mongoose.model('Cart', CartShema)