const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    service: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
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
    date: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    people: {
        type: Number,
        required: false
    },
    product: {
        type: String,
        required: false
    }
});

const Order = mongoose.model('Order', UserSchema);
module.exports = Order;