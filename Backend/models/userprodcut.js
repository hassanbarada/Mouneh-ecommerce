/*const mongoose = require('mongoose');
const UserModel = require('./user');
const ProductModel = require('./product').schema;
const connect = require('../server/connect');
 // Replace with the appropriate product schema


const userProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        validate: {
            validator: async function (value) {
                const userExists = await UserModel.exists({ _id: value });
                return userExists;
            },
            message: 'User does not exist.'
        }
    },
    product: {
        type: ProductModel,
        required: true 
    }
});

const UserProductModel = mongoose.model('UserProduct', userProductSchema);

module.exports = UserProductModel;*/