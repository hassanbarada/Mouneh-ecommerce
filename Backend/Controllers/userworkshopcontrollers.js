// controllers/workshopRegistration.js
const UserWorkshopModel = require('../models/userworkshop');
const UserModel = require('../models/user');
const WorkshopModel = require('../models/workshop');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports.registerForWorkshop = async (req, res) => {
  const workshopId  = req.params.workshopID;
  const userId = req.user.user.id;

  try {
    // Check if the user has already registered for this workshop
    const existingRegistration = await UserWorkshopModel.findOne({ user: userId, workshop: workshopId });
    if (existingRegistration) {
      return res.status(400).json('You are already registered for this workshop.');
    }

    // Create a new registration entry
    const registration = new UserWorkshopModel({
      user: userId,
      workshop: workshopId
    });

    const savedRegistration = await registration.save();
    res.status(201).json(savedRegistration);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.fetchUserWorkshops = async (req, res) => {
  const userId = req.user.user.id;

  try {
    // Find workshops registered by the user
    const userWorkshops = await UserWorkshopModel.find({ user: userId }).populate('workshop');
    res.status(200).json(userWorkshops);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAllUserWorkshops = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userWorkshops = await UserWorkshopModel.find({ user: userId });

    if (userWorkshops.length === 0) {
      return res.status(404).json({ success: false, message: 'user workshops not found.' });
    } else {
      const workshopIds = userWorkshops.map(userWorkshop => userWorkshop.workshop);

      const workshops = await WorkshopModel.find({ _id: { $in: workshopIds } }).select("title");

      const userWorkshopsWithTitles = userWorkshops.map(userWorkshop => ({
        userworkshopId: userWorkshop._id,
        title: workshops.find(workshop => workshop._id.equals(userWorkshop.workshop)).title
      }));

      res.status(200).json({ success: true, userws: userWorkshopsWithTitles });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


//is user workshop

module.exports.isRegisteredInWorkshop = async (req, res) => {
  try {
    const userId = req.params.userId;
    const workshopId = req.params.workshopId;
    const userWorkshop = await UserWorkshopModel.findOne({ user: userId, workshop: workshopId });

    if (userWorkshop) {
      // User is registered in the workshop
      res.status(200).json({ success: true, isRegistered: true });
    } else {
      // User is not registered in the workshop
      res.status(200).json({ success: true, isRegistered: false });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

module.exports.fetchWorkshopRegisteredUsers = asyncHandler(async (req, res) => {
  const workshopId = req.params.workshopID;

  try {
    // Find users registered for the given workshop
    const registeredUsers = await UserWorkshopModel.find({ workshop: workshopId }).populate('user');

    // Extract user details and send response
    const users = registeredUsers.map(registration => registration.user);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching registered users.' });
  }
});

exports.unregisterUserFromWorkshop = async (req, res) => {
  const { workshopId, userId } = req.params;

  try {
    // Find the workshop registration entry by user and workshop ID
    const registration = await UserWorkshopModel.findOne({ user: userId, workshop: workshopId });

    if (!registration) {
      return res.status(404).json({ message: 'User registration for workshop not found' });
    }

    // Remove the registration entry
    await registration.deleteOne();

    res.json({ message: 'User unregistered from workshop successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};