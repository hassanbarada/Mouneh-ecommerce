const connect = require('../server/connect');
const UserModel = require("../models/user");


// Example usage
const newUser = new UserModel({
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@example.com',
    password: 'Password123',
    phonenumber: '1234567890',
    city: '123 Main St',
    age: 25,
    role: 1
});

newUser.validate()
    .then(() => {
        console.log('Validation succeeded. User data is valid.');
        newUser.save();
    })
    .catch((error) => {
        for (const key in error.errors) {
            if (error.errors.hasOwnProperty(key)) {
                console.log(`${key}: ${error.errors[key].message}`);
            }
        }
    });


connect();