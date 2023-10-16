const connect = require('../server/connect');
const ProductModel = require("../models/product");

const newProduct = new ProductModel({
    name: 'Example Product',
    image: 'https://example.com/product.jpg',
    price: 10.99,
    quantity: 100,
    description: 'This is an example product.',
    weight: 0.5,
    category: 'Food', // Replace with one of the allowed category values
    subcategory: 'Subcategory2', // Replace with one of the allowed subcategory values for the given category
    recipes: {
        ingredient: 'Example Ingredient',
        time: 30,
        method: 'Example Method'
    }
});

newProduct.save()
    .then(() => {
        console.log('Product saved successfully.');
    })
    .catch((error) => {
        console.log('Error saving Product:', error);
    });

    connect();