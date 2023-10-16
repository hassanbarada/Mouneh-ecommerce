const mongoose = require('mongoose');
//const UserModel = require('./user');
const workshopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'workshop name is required.'],
        trim: true,
        minlength: [2, 'workshop name must be at least 2 characters long.'],
        maxlength: [50, 'workshop name cannot exceed 50 characters.']
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    capacity:{
        type: Number,
        required: [true, 'capacity  is required.'],
        min: [10, 'Minimum capacity allowed is 18.'],
        max: [30, 'Maximum capacity allowed is 30.']
    },
    duration: {
        type: Number,
        required: [true, 'duration  is required.'],
        min: 0,
    },
    description: {
        type: String,
        required: [true, 'description  is required.'],
    },
    category: {
        type: String,
        required: [true, 'category is required.'],
        enum: ['Food', 'Craft'],
    }
});

const workshopModel = mongoose.model('workshops', workshopSchema);


module.exports = workshopModel;