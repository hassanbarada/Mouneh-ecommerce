const mongoose = require('mongoose');
const UserModel = require("./user");


const productSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true,
        minlength: [2, 'Product name must be at least 2 characters long.'],
        maxlength: [50, 'Product name cannot exceed 50 characters.']
    },
    imagePath: {
        type: String,
        required: [true, 'Product image data is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
        min: [0, 'Product price cannot be negative.']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required.'],
        min: [0, 'Product quantity cannot be negative.']
    },
    description: {
        type: String,
       /* required: [true, 'Product description is required.'],*/
        trim: true,
        minlength: [1, 'Product description must be at least 10 characters long.']
    },

    status:{
        type: String,
        required: [true, 'Product category is required.'],
        enum: ['waiting', 'accepted'] // Replace with the desired category values
    },
    
    category: {
        type: String,
        required: [true, 'Product category is required.'],
        enum: ['Food', 'Craft'] // Replace with the desired category values
    },
    
    
    recipes: {
        ingredient: {
            type: String,
            required: function () {
                return this.category === 'Food';
            }
        },
        weight: {
            type: Number,
            required: function () {
                return this.category === 'Food';
            },
            min: [0, 'Product weight cannot be negative.']
        },
        time: {
            type: Number,
            required: function () {
                return this.category === 'Food';
            },
            min: [1, 'Recipe time must be a positive value.']
        },
        method: {
            type: String,
            required: function () {
                return this.category === 'Food';
            }
        }
    }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;

// Example usage
