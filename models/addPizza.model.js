const mongoose= require('mongoose');
const pizzaShecma= new mongoose.Schema({

    title: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    }
});

const addPizza = mongoose.model('addPizza', pizzaShecma)
module.exports = addPizza;