const UserComment = require('../models/userCommentModel');
const addPizza= require('../models/addPizza.model');
const Order = require('../models/order');

exports.getHomePage = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('HomePage',{product: product, title: 'Online Ordering Pizza',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getsignupPage = (req, res, next) => {
    res.render('signup', {
        pageTitle: 'signup',
    })
}

exports.getMondaySpecial = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('MondaySpecial',{product: product, pageTitle: 'Monday Special',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getCombodeals = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('Combodeals',{product: product, title: 'Combo deals',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getdrinksPage = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('drinksPage',{product: product, title: 'Drinks Page',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getchocolate = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('chocolate',{product: product, title: 'chocoalte Page',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}
exports.getUserProfile = (req, res, next) => {
    if(!req.cookies["username"]) {
        return res.redirect('/signup');
    } 
    else {
        addPizza.find().then(product =>{
            console.log(product);
        res.render('profile',{product: product, title: 'Profile Page',username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
        })
    }
}

exports.getsidesPage = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('sidesPage',{product: product, title: 'Side Page',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getprofilePage=(req,res,next)=>{
    res.render('profilePage',{
        pageTitle:'Profile page',
    })
}

exports.getorderform=(req,res,next)=>{
    if(!req.cookies["username"]) {
        return res.redirect('/signup');
    } 
    else {
        addPizza.findById(req.params.id).then(product =>{
            // console.log(comment);
            res.render('orderform', {product: product,username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
        })
    }
}
exports.getproductPage = (req, res, next) => {
    addPizza.findById(req.params.id, function(err, product){
        console.log(product);
        UserComment.find().then(comment =>{
            // console.log(comment);
            res.render('productPage', {comment: comment, product: product,username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
        })
    });
}
exports.getPurchase=(req,res,next)=>{
    res.render('purchaseHistory',{
        pageTitle:'purchaseHistory'
    })
    
}

exports.getadminPage=(req,res,next)=>{
    if(req.cookies["username"] == "admin2021") {
        addPizza.find().then(price =>{
            console.log(price);
        res.render('adminPage',{price: price});
        }).catch(err=>{
            console.log(err);
        })
    } 
    else {
        res.write("You are not an admin, imposter!");
        res.end();
    }
}
exports.getmessage=(req,res,next)=>{
    res.render('messageBox',{
        pageTitle:'Inbox page'
    })
}

exports.getrecipt=(req,res,next)=>{
    res.render('Recipt',{
        pageTitle:'Recipt'
    })
}

exports.getorderlog=(req,res,next)=>{
    if(req.cookies["username"] == "admin2021") {
        Order.find().then(order =>{
            res.render('orderlog',{order: order});
        }).catch(err=>{
            console.log(err);
        })
    } 
    else {
        res.write("You are not an admin, imposter!");
        res.end();
    }
}

exports.getcommentlog=(req,res,next)=>{
    if(req.cookies["username"] == "admin2021") {
        addPizza.find(function(err, product){
            UserComment.find().then(comment =>{
                res.render('commentlog', {comment: comment, product: product});
            }).catch(err=>{
                console.log(err);
            })
        });
    } 
    else {
        res.write("You are not an admin, imposter!");
        res.end();
    }
}

exports.search=(req,res,next)=>{
    let search= new RegExp(req.body.search2,'i');
    console.log(search);
    addPizza.find({title:search}).then(product =>{
    res.render('HomePage',{product: product, title: 'Online Ordering Pizza', username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}