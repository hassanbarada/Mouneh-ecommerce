const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

// Update
module.exports.updateUser = async (req, res) => {
  console.log('req.user:', req.user);
  console.log('req.params.id:', req.params.id);
  if (req.user.user.id === req.params.id || req.user.user.isAdmin) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10); 
    }
    try {
      const updateUser = await UserModel.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can update only your account!');
  }
};

//Delete
module.exports.deleteUser = async (req, res) => {
  const userID = req.params.id;

  try {
    // Check if the user with the given userID exists
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Compare the userID of the user with the id of the authenticated user
    if (req.user.user.id === userID || req.user.user.isAdmin) {
      try {
        // If the authenticated user is the owner or an admin, proceed with the deletion
        await UserModel.findByIdAndDelete(userID);
        res.status(200).json({ message: 'User has been deleted.' });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json({ error: 'You can delete only your account or you must be an admin.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get User
module.exports.getUser = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    if (req.user.user.id === userID || req.user.user.isAdmin) {
      try{
  await UserModel.findById(userID);
    const { password, ...info } = user._doc;
    res.status(200).json(info);}catch (err) {
      res.status(500).json(err);
    }}else {
      res.status(403).json({ error: 'You canfind the user on your account or you must be an admin.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get All User
module.exports.getAllUser = async (req, res) => {
  const query = req.query.new;
  if (req.user.user.isAdmin) {
    try {
      const users = query ? await UserModel.find().sort({_id:-1}).limit(10) : await UserModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed to see all users');
  }
};

//Get user stats
module.exports.statUser = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
if (req.user.user.isAdmin){
try{
  const data = await UserModel.aggregate([
      {
          $project:{
              month: {$month: "$createdAt"}
          }
      },{
          $group: {
              _id: "$month",
              total: {$sum:1}
          }
      }
  ]);
  res.status(200).json(data)
}catch(err){
  res.status(500).json(err);
}
}
else{
res.status(403).json('You are not allowed to see stats users');
};
}