const mongoose = require('mongoose');
const connect = require('../server/connect');
const UserWorkshopModel = require('../models/userworkshop');


// Example usage
const newUserWorkshop = new UserWorkshopModel({
    user: '64a7f8049633945cd3642b61', // Replace with the actual user ID
    workshop:'64a919572b3561812a10da53' , // Replace with the actualworkshop ID
});

newUserWorkshop.save()
    .then(() => {
        console.log('UserWorkshop saved successfully.');
    })
    .catch((error) => {
        console.log('Error saving UserWorkshop:', error);
    });

    connect();