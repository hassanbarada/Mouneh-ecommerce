const ChatModel = require('../models/chat');
const UserModel = require('../models/user');

// Controller to add a chat
exports.addChat = async (req, res) => {
  try {
    const { workshop, user, message } = req.body;

    // Create a new chat instance
    const newChat = new ChatModel({
      user,
      message,
      workshop
    });

    // Save the chat to the database
    await newChat.save();

    res.status(201).json({ success: true, message: 'Chat added successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Controller to get all messages of a specific chat
exports.getMessagesByChat = async (req, res) => {
  try {
    const workshopID = req.params.workshopID;

    // Find the chat by ID and select the 'message' field
    const chat = await ChatModel.find({ workshop: workshopID }).select('message');

    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found.' });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get all chats
exports.getAllChats = async (req, res) => {
  try {
    const workshopid = req.params.workshopid;

    const chats = await ChatModel.find({ workshop: workshopid }).select("user message");

    if (chats.length === 0) {
      return res.status(404).json({ success: false, message: 'Chats not found.' });
    }

    res.status(200).json({ success: true, message: chats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getUsernameByID = async (req, res) => {
  try {
    const userId = req.params.userId;
    const firstname = await UserModel.findById(userId).select("firstname");

    if (!firstname) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.status(200).json({ firstname: firstname });
  }
  catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};