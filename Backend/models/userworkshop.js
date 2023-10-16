const mongoose = require('mongoose');
const UserModel = require('./user');
const WorkshopModel = require('./workshop');

const userWorkshopSchema = new mongoose.Schema({
    user: {
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
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop ',
        validate: {
            validator: async function (value) {
                const workExists = await WorkshopModel.exists({ _id: value });
                return workExists;
            },
            message: 'Workshop does not exist.'
        }
    }
})

const UserWorkshopModel = mongoose.model('UserWorkshop',userWorkshopSchema)

module.exports = UserWorkshopModel;