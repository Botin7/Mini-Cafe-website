
const mongoose = require('mongoose');
const Cartschema = new mongoose.Schema({
    userID:{
        type:String,
        required: true
    }
    ,
    amount: {
        type: Number,
        required: false
    },
    total: {
        type: Number,
        required: false
    },
    payment: {
        type: String,
        required: false
    },
    productID: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    service: {
        type: String,
        required: false
    }
});

const Cart = mongoose.model('Cart', Cartschema);
module.exports = Cart;

