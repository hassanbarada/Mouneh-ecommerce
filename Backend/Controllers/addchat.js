const connect = require('../server/connect');
const ChatModel = require('../models/chat');


// Example usage
const newChat = new ChatModel({
    user: '64a7f8049633945cd3642b61', // Replace with the actual user ID
    message: 'Hello, this is a chat message.',
    userworkshop: '64a9237dd3b75f0fd1c1f08f' // Replace with the actual workshop ID
});

newChat.save()
    .then(() => {
        console.log('Chat saved successfully.');
    })
    .catch((error) => {
        console.log('Error saving Chat:', error);
    });

    connect();