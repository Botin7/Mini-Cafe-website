const express = require('express');
const router = express.Router();
const userController=require('../../controller/userController')

router.post('/price',userController.createPizza);
// router.post('/getUserComment', userController.getUserComment);

module.exports = router;

//the may need to change "get" to something else if we want the website to work correctly
//in order to route, write code in controller