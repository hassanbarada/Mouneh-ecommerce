const WorkshopModel = require("../models/workshop");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
// Add a new workshop (accessible only to admin)
module.exports.addWorkshop = async (req, res) => {
  console.log("Incoming request body:", req.body);
  
  if (req.user.user.isAdmin) {
    try {
      const newWorkshop = await WorkshopModel.create(req.body);
      console.log("New workshop created:", newWorkshop);
      res.status(201).json(newWorkshop);
    } catch (err) {
      console.error("Error creating workshop:", err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You do not have admin privileges to add a workshop.');
  }
};

// Update an existing workshop (accessible only to admin)
module.exports.updateWorkshop = async (req, res) => {
  if (req.user.user.isAdmin) {
    try {
      const workshopID = req.params.workshopID;
      const updatedWorkshop = await WorkshopModel.findByIdAndUpdate(
        workshopID,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedWorkshop);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You do not have admin privileges to update a workshop.');
  }
};

// Delete an existing workshop (accessible only to admin)
module.exports.deleteWorkshop = async (req, res) => {
  if (req.user.user.isAdmin) {
    try {
      const workshopID = req.params.workshopID;
      await WorkshopModel.findByIdAndRemove(workshopID);
      res.status(200).json('Workshop deleted successfully.');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You do not have admin privileges to delete a workshop.');
  }
};

// Get all workshops 
module.exports.getAllWorkshops = async (req, res) => {
    try {
      const workshops = await WorkshopModel.find();
      res.status(200).json(workshops);
    } catch (err) {
      res.status(500).json(err);
    }
  
};

module.exports.getWorkshopById = async (req, res) => {
  try {
    const workshopID = req.params.workshopID;
    const workshop = await WorkshopModel.findById(workshopID);
    
    if (!workshop) {
      return res.status(404).json('Workshop not found.');
    }
    
    res.status(200).json(workshop);
  } catch (err) {
    res.status(500).json(err);
  }
};
