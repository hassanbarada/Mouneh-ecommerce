const mongoose = require('mongoose');
const ProductModel = require('./product');
const UserModel = require('./user');

const addToCarSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async function (value) {
                const userExists = await UserModel.exists({ _id: value });
                return userExists;
            },
            message: 'User does not exist.'
        }
    },
    productID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        validate: {
            validator: async function (value) {
                const productExists = await ProductModel.exists({ _id: value });
                return productExists;
            },
            message: 'Product does not exist.'
        }
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required.'],
        min: [0, 'Product quantity cannot be negative.']
    },
    expirationTime: {
        type: Date,
        required: true
    }
})

const CartModel = mongoose.model('AddToCart', addToCarSchema);

module.exports = CartModel;
