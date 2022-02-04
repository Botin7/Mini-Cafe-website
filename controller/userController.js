const UserComment = require('../models/userCommentModel');
const mongoose = require('mongoose');
const { localsName } = require('ejs');
const addPizza = require('../models/addPizza.model');


exports.createUserComment = (req, res) =>{
    if(!req.cookies["username"]) {
        return res.redirect('/signup');
    } 
    else {
        const productId = req.body.productId;
        const comment = req.body.comment;
        const postAt = new Date().toLocaleString();
        const rating = req.body.rating;
        const username = req.cookies["username"];

        const userComment = new UserComment({
            username: username,
            productId: productId,
            comment: comment,
            rating: rating,
            postAt : postAt,
        });
        userComment.save().then(result=>{
            console.log('comment is created');
            res.redirect('/product-page/' + productId);
        }).catch(err=>{
            console.log(err);
        })
    }
}

exports.getUserComment = (req, res) =>{
    const productId = "Pizza";
    console.log(productId)
    UserComment.find({productId: productId}).then(result=>{
        console.log(result)
        res.json(result);
    }).catch(err =>{
        console.log(err);
    })
}

exports.createPizza = (req, res) =>{
    if(true){
        const name = "Baccon";
        const price = req.body.price;
        const taste="sweet"
        const postAt = new Date().toLocaleString();

        const addPizza = new addPizza({
            name: "Baccon",
            taste: "taste",
            price: price,
            postAt : postAt,
        });
        addPizza.save().then(result=>{
            console.log('Add is done');
            res.redirect('/admin-page');
        }).catch(err=>{
            console.log(err);
        })
    }
    else{
        res.json({success: false});
    }
}

exports.PizzaAdd = (req, res) =>{
    const name = "Pizza";
    console.log(name)
    addPizza.find({name: name}).then(result=>{
        console.log(result)
        res.json(result);
    }).catch(err =>{
        console.log(err);
    })
}


