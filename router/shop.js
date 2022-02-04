const express = require('express');
const path = require('path');
const shopController = require('../controller/shop');

const router = express.Router();

router.get('/all-product', shopController.getAllProducts);

router.get('/detail', shopController.getProductDetail);

router.post('/add-to-cart', shopController.addToCart);

/*router.get('/showcart', shopController.getCart);*/

router.post('/edit/:id',shopController.editProductPost)

router.post('/delete',shopController.deleteById)

router.post('/deleteOrder',shopController.deleteOrder)

router.post('/deleteComment',shopController.deleteComment)

router.post('/newComment',shopController.newComment)

router.post('/cart',shopController.addtocart)

router.post('/checkout',shopController.checkout)



router.get('/error-demo', (req, res, next) => {
    throw new Error('This is to test Error handling in express');
});

module.exports = router;