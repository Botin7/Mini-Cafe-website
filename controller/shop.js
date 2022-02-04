const Product = require('../models/product');
const UserComment = require('../models/userCommentModel');
const Cart = require('../models/cart');
const Pizza = require('../models/addPizza.model');
const Order = require('../models/order');
const Check = require('../models/checkout');
const fs = require('fs');


exports.getAllProducts = (req, res, next) => {
    const products = Product.findAll();
    // console.log(products);
    res.render('app', { name: 'Selasak', prods: products, path: '/all-product', pageTitle: 'Prdouct' });
};

exports.getProductDetail = (req, res, next) => {
    const products = Product.findById(req.params.prodId);
    res.render('product-detail', { prod: products[0], pageTitle: 'Product Detail', path: '/detail', name: 'Pariha' });
}

exports.addToCart = (req, res, next) => {
    const addedProduct = Product.findById(req.body.id)[0];
    Cart.save(addedProduct);
    res.redirect('/cart');
}

/*exports.getCart = (req, res, next) => {
    res.render('cart', {
        pageTitle: 'cart',
    })
}*/


exports.editProductPost = (req, res, next) => {
    
}
exports.deleteById = (req, res, next) => {
    console.log('hi')
    console.log(req.body.prodId);

    //res.redirect('/admin-page');
    const id= req.body.prodId;
    console.log(id)
    Pizza.findByIdAndDelete(id)
    .then(result=>{
        console.log(result)
        res.redirect('/admin-page')
    }).catch(error=>{
        console.log(error)
    })
}

exports.deleteOrder = (req, res, next) => {
    const id= req.body.orderId;
    Order.findByIdAndDelete(id)
    .then(result=>{
        console.log(result)
        res.redirect('/orderlog')
    }).catch(error=>{
        console.log(error)
    }) 
}

exports.deleteComment = (req, res, next) => {
    const id= req.body.commentId;
    UserComment.findByIdAndDelete(id)
    .then(result=>{
        console.log(result)
        res.redirect('/commentlog')
    }).catch(error=>{
        console.log(error)
    }) 
}

exports.newComment = (req, res, next) => {
    const id= req.body.commentId;
    const productId = req.body.productId;
    UserComment.findByIdAndDelete(id)
    .then(result=>{
        console.log(result)
        res.redirect('/product-page/'+productId)
    }).catch(error=>{
        console.log(error)
    }) 
}

exports.addtocart = (req, res, next) => {

  
   /* static save(product) {

        if (cart === null) {
            cart = { products: [], totalPrice: 0 };
        }

        const existingProductIndex = cart.products.findIndex(p => p.id == product.id); // to check product is existing in cart
        if (existingProductIndex >= 0) { // exist in cart already
            const exsitingProduct = cart.products[existingProductIndex];
            exsitingProduct.qty += 1;
        } else { //not exist
            product.qty = 1;
            cart.products.push(product);
        }

        cart.totalPrice += product.price;
    }

    static getCart() {
        return cart;
    }

    static delete(productId) {
        const isExisting = cart.products.findIndex(p => p.id == productId);
        if (isExisting >= 0) {
            cart.products.splice(isExisting, 1);
        }
    }*/

    const userID=req.body.userID;
    const title=req.body.title;
    const productID=req.body.productID;
    const amount=req.body.amount;
    const date=req.body.date;
    const payment=req.body.payment;
    const product = req.body.product;
    const service = req.body.service;
    const total = Math.round((payment * amount)*100) / 100 ;
    const username= req.body.username;
    
    const cart = new Cart({
        service: service,
        amount: amount,
        payment : payment,
        total: total,
        date : date,
        productID:productID,
        title : title,
        username: username,});


    Cart.findOne({productID: productID, userID:userID}).then(result=>{
        res.render('cart', { userID: userID, amount: amount, payment: payment, date: date ,title : title,productID: productID,product: product,service:service});
        
        if(result){

            
            Cart.findById(result._id,{
                amount: amount+result.amount,
                total: (amount+result.amount) *payment
            }).then(result=>{res.status(200).send();
               
            
            }).catch(err=>{
                console.log(err);
            })


        }

        else{

            const cart= new Cart({

                userID:userID,
                productID:productID,
                amount:amount,
                payment:payment,
                total: amount*payment,
            });
            cart.save().then(result=>{
                res.status(200).send();
                
            })
            
            .catch(err=>{
                console.log(err);
            })
        }

    })
    
}

exports.checkout = (req, res, next) => {

  
    /* static save(product) {
 
         if (cart === null) {
             cart = { products: [], totalPrice: 0 };
         }
 
         const existingProductIndex = cart.products.findIndex(p => p.id == product.id); // to check product is existing in cart
         if (existingProductIndex >= 0) { // exist in cart already
             const exsitingProduct = cart.products[existingProductIndex];
             exsitingProduct.qty += 1;
         } else { //not exist
             product.qty = 1;
             cart.products.push(product);
         }
 
         cart.totalPrice += product.price;
     }
 
     static getCart() {
         return cart;
     }
 
     static delete(productId) {
         const isExisting = cart.products.findIndex(p => p.id == productId);
         if (isExisting >= 0) {
             cart.products.splice(isExisting, 1);
         }
     }*/
 
     const title=req.body.title;
     const productID=req.body.productID;
     const amount=req.body.amount;
     const date=req.body.date;
     const payment=req.body.payment;
     const product = req.body.product;
     const service = req.body.service;
     const total = Math.round((payment * amount)*100) / 100 ;
     
     const check = new Check({
         service: service,
         amount: amount,
         payment : payment,
         total: total,
         date : date,
         productID:productID,
         title : title,
         product:product,
        });
 
     Check.findOne({productID: productID, }).then(result=>{
         res.render('checkout', { amount: amount, payment: payment ,title : title,productID: productID,product: product,service:service});
         
         if(result){
 
             
             Check.findById(result._id,{
                 amount: amount+result.amount,
                 total: (amount+result.amount) *payment
             }).then(result=>{res.status(200).send();
                
             
             }).catch(err=>{
                 console.log(err);
             })
 
 
         }
 
         else{
 
             const check= new Check({
 
                 userID:userID,
                 productID:productID,
                 amount:amount,
                 payment:payment,
                 total: amount*payment,
             });
             cart.save().then(result=>{
                 res.status(200).send();
                 
             })
             
             .catch(err=>{
                 console.log(err);
             })
         }
 
     })
     
 }
       
    

