const mongoose = require('mongoose');
const connect = require('../server/connect');
const UserProductModel = require('../models/userproduct');


// Example usage
const newUserProduct = new UserProductModel({
    user: '64a7f8049633945cd3642b61', // Replace with the actual user ID
    product: {
        name: 'Example Product',
        image: 'https://example.com/product.jpg',
        price: 10.99,
        quantity: 100,
        description: 'This is an example product.',
        weight: 0.5,
        category: 'Craft', // Replace with one of the allowed category values
        subcategory: 'Subcategory4', // Replace with one of the allowed subcategory values for the given category
        recipes: {
            ingredient: 'Example Ingredient',
            time: 30,
            method: 'Example Method'
        }
    }
});

newUserProduct.save()
    .then(() => {
        console.log('UserProduct saved successfully.');
    })
    .catch((error) => {
        console.log('Error saving UserProduct:', error);
    });


connect();