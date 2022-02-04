const Product = require('../models/product');
const Pizza = require('../models/addPizza.model');
const Order = require('../models/order');
const path = require('path');

exports.getProductForm = (req, res, next) => {
    if(req.cookies["username"] == "admin2021") {
        res.render('add-product', { name: 'Botin', path: '/all-product', pageTitle: 'Add Product' });
    } 
    else {
        res.write("You are not an admin, imposter!");
        res.end();
    }
}

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;

    const pizza = new Pizza({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description : description,
        category : category,
    });
    pizza.save().then(result=>{
        console.log('Pizza is created');
        res.redirect('/admin-page');
    }).catch(err=>{
        console.log(err);
    })
}

exports.editProductPage = (req, res, next) => {
    const products = Product.findById(req.params.prodId);
    res.render('edit-product', { product: products[0], path: '/edit-product/:prodId', pageTitle: 'Edit Product', name: 'Selasak' });
}

exports.editProductPost = (req, res, next) => {
    const updatedProduct = new Product(req.body.id, req.body.title, req.body.price, req.body.imageURL, req.body.description);
    updatedProduct.update();
    // res.redirect('/');
    res.redirect('/products/' + updatedProduct.id);
}

exports.deleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id);
    res.redirect('/all-product');
}

exports.postOrder = (req, res, next) => {
    const price=req.body.price;
    const id= req.body.productID;
    const service = req.body.service;
    const name = req.body.name;
    const phone = req.body.phone;
    const amount = req.body.amount;
    const total = Math.round((price * amount)*100) / 100 ;
    const payment = req.body.payment;
    const date = req.body.date;
    const location = req.body.location;
    const people = req.body.people;
    const product = req.body.product;
    const username= req.body.username;
    
    const order = new Order({
        service: service,
        name: name,
        phone: phone,
        amount: amount,
        payment : payment,
        total: total,
        date : date,
        location : location,
        people : people,
        product : product,
        username: username,
    });
    order.save().then(result=>{
        console.log('order is created');
        // res.redirect('/recipt');
        res.render('Recipt', { service: service, name: name, phone: phone, amount: amount, payment: payment, date: date, location: location, people: people, product: product, id: id, price:price, total:total, username: username });
    }).catch(err=>{
        console.log(err);
    })
}

exports.purchase = (req, res, next) => {
    Order.find().then(order =>{
        res.render('purchaseHistory',{order: order,username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
    })
}