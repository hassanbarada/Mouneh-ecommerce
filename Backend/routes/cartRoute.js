const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const {addCart,getCartItems,deleteCartItem,deleteAllCartItems} = require('../Controllers/cartController');

const router = Router();

router.post('/cart/:userID/:productID',verify,addCart);
router.get('/cart',verify,getCartItems);
router.delete('/cart/:userID/:cartID',verify,deleteCartItem);
router.delete('/cart/:userID',verify,deleteAllCartItems)


module.exports = router;
