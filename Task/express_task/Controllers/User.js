const User = require("../models/User");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addInvalidToken } = require("../utils/authMiddleware");

const userGet = async (req, res) => {
  try {
    const users = await User.find();
    logger.success("User Fetched");
    res.json(users);
  } catch (err) {
    logger.error(`Error in fetching user ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const userPost = async (req, res) => {
  const { firstName, lastName, mobileNumber, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      // If user exists, send a response and return from the function
      return res.status(400).json({ message: "User with same email address already exists" });
    }

    // If user doesn't exist, proceed to save the new user
    const userData = new User({
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
    });
    const newUser = await userData.save();
    logger.success("User Saved");
    return res.status(201).json(newUser);
  } catch (err) {
    logger.error(`Error in saving user ${err}`);
    return res.status(400).json({ message: err });
  }
};


const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // valdaite email
    const user = await User.findOne({ email });
    // valdiate password
    const valdiatePassword = password === user.password;
    if (!user || !valdiatePassword)
      return res.status(400).send("Invalid Credentials");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30m",
    });
    logger.success("Login successfull");
    res.header("auth-token", token).send({token,user});
  } catch (err) {
    logger.error(`Login Error : ${err}`);
    res.status(400).json({ message: "Invalid Credentials" });
  }
};

const userLogout = async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) res.status(401).send("Access denied");
    addInvalidToken(token);
    res.status(200).send("Logged out successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { userGet, userPost, userLogin,userLogout };
