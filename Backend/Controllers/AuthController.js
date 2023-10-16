const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const nodeMailer = require('nodemailer');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, password, city, age, phonenumber } = req.body;

    if (!firstname || !lastname || !email || !password || !city || !age || !phonenumber) {
      res.status(400).json({ error: "All fields are mandatory!" });
      return;
    }

    const emailUser = await User.findOne({ email });
    const phoneUser = await User.findOne({ phonenumber });

    if (emailUser && phoneUser) {
      res.status(400).json({ error: "Email and phone number already registered" });
      return;
    } else if (emailUser) {
      res.status(400).json({ error: "User already registered with this email" });
      return;
    } else if (phoneUser) {
      res.status(400).json({ error: "User already registered with this phone number" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = firstname + " " + lastname;
    const user = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      city,
      age,
      phonenumber
    });

    console.log(`User created ${user}`);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400).json({ error: "User data is not valid" });
    }
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
          isAdmin:user.isAdmin
        },
      },
      process.env.ACCESS,
      { expiresIn: "1d" }
    );
    res.status(200).json({ user,accessToken });
  } else {
    res.status(401).json({ error: "Email or Password is not valid" });
  }
});

const forgot = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const token = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
          isAdmin: user.isAdmin
        },
      },
      process.env.ACCESS,
      { expiresIn: '1d' }
    );

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password Link',
      text: `http://localhost:3000/reset_password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send reset email' });
      } else {
        return res.status(200).json({ message: 'Reset email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



const reset = asyncHandler(async (req, res) =>  {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token,process.env.ACCESS, (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              User.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
})



module.exports = { registerUser, loginUser,forgot,reset };