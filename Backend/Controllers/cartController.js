const CartModel = require('../models/Cart');
const ProductModel = require('../models/product');
const cron = require('node-cron');


(async () => {
  await cron.schedule('0 0 * * *', async () => {
      try {
          const now = new Date();
          const deletedItems = await CartModel.find({ expirationTime: { $lte: now } });
          
          const totalDeletedQuantities = deletedItems.reduce((total, item) => total + item.quantity, 0);
          
          for (const item of deletedItems) {
              const product = await ProductModel.findById(item.productID);
              if (product) {
                  product.quantity += item.quantity;
                  await product.save();
              }
          }
          
          // Delete the expired items
          await CartModel.deleteMany({ expirationTime: { $lte: now } });
          
          console.log('Expired cart items have been removed and product quantities updated.');
      } catch (err) {
          console.error('Error removing expired cart items and updating product quantities:', err);
      }
  });
})();

// ADD TO CART
module.exports.addCart = async (req, res) => {
  if (req.user.user.id === req.params.userID) {
      const userID = req.user.user.id;
      const productID = req.params.productID;
      const quantity = req.body.quantity;
      const now = new Date();
      const expirationTime = new Date(now.getTime() + (24 * 60 * 60 * 1000)); // 24 hours later
      
      try {
          const cart = await CartModel.create({ userID, productID, quantity, expirationTime });
          console.log(`Cart created ${cart}`);
          
          
          
          const response = {
              cart,
          };
          
          res.status(201).json(response);
      } catch (err) {
          console.error('Error creating Cart:', err);
          res.status(400).json({ err: 'Cart data is not valid.' });
      }
  } else {
      res.status(403).json('You are not allowed to add a Cart');
  }
};


// GET CART ITEMS FOR A SPECIFIC USER
module.exports.getCartItems = async (req, res) => {
    const userID = req.user.user.id;
  
    try {
      const cartItems = await CartModel.find({ userID }).populate('productID');
      res.status(200).json(cartItems);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).json({ err: 'Internal server error.' });
    }
  };
  

  // DELETE CART ITEM
module.exports.deleteCartItem = async (req, res) => {
    if (req.user.user.id === req.params.userID){
    try {
      const cartID = req.params.cartID;
      const userID = req.user.user.id;
  
      // Find the cart item by ID and check if it belongs to the authenticated user
      const cartItem = await CartModel.findOne({ _id: cartID, userID });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found.' });
      }
  
      // If the cart item exists and belongs to the user, proceed with deletion
      await CartModel.findByIdAndDelete(cartID);
      res.status(200).json({ message: 'Cart item has been deleted.' });
    } catch (err) {
      console.error('Error deleting cart item:', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
}else {
    res.status(403).json('You can delete only your cart!');
  }
  };


  // DELETE ALL CART ITEMS FOR A SPECIFIC USER
module.exports.deleteAllCartItems = async (req, res) => {
  if (req.user.user.id === req.params.userID) {
    try {
      const userID = req.user.user.id;

      // Delete all cart items belonging to the user
      await CartModel.deleteMany({ userID });

      res.status(200).json({ message: 'All cart items have been deleted.' });
    } catch (err) {
      console.error('Error deleting cart items:', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.status(403).json('You can delete only your cart items.');
  }
};
