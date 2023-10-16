const mongoose = require('mongoose');
const connect = require('../server/connect');
const WorkshopModel = require('../models/workshop');

// Example usage
const newWorkshop = new WorkshopModel({
    title: 'Example Workshop',
    price: 99.99,
    capacity: 10,
    duration: 120,
    description: 'This is an example workshop.',
    category: 'Food'
});

newWorkshop.save()
    .then(() => {
        console.log('Workshop saved successfully.');
    })
    .catch((error) => {
        console.log('Error saving Workshop:', error);
    });

    connect();