const mongoose = require('mongoose');
const UserWorkshopModel = require('./userworkshop');
const UserModel = require('./user');



const chatSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            validate: {
                validator: async function (value) {
                    const userExists = await UserModel.exists({ _id: value });
                    return userExists;
                },
                message: 'User does not exist.'
            }
        },
        message: {
            type: String,
            required: [true, 'Message is required.'],
            minlength: [1, 'Message must contain at least 1 character.'],
            maxlength: [500, 'Message cannot exceed 500 characters.']
        },
        workshop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserWorkshop',
            validate: {
                validator: async function (value) {
                    const userWorkshopExists = await UserWorkshopModel.exists({ _id: value });
                    return userWorkshopExists;
                },
                message: 'UserWorkshop does not exist.'
            }
        },
        time: {
            type: Date,
            default: Date.now
        }
});

const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;