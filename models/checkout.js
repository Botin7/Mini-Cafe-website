
const mongoose = require('mongoose');
const Checkschema = new mongoose.Schema({
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

const Checkout = mongoose.model('Checkout', Checkschema);
module.exports = Checkout;

