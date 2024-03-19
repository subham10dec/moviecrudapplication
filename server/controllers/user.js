const Movie = require("../models/movie");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const exisistingUser = await User.findOne({
      email: req.body.email,
    });
    if (exisistingUser) {
      return res.status(400).send("user with this email already exsists");
    }
    const encodedPassword = await bcrypt.hash(req.body.password, 8);
    const user = new User({
      ...req.body,
      password: encodedPassword,
    });
    await user.save();
    return res.status(201).send(user);
  } catch (err) {
    return res
      .status(500)
      .send(`error while registering a new User.Try again Later`);
  }
};

const login = async (req, res) => {
  try {
    const exisistingUser = await User.findOne({
      email: req.body.email,
    });
    if (!exisistingUser) {
      return res.status(404).send("Invalid email address");
    }

    const isEqual = await bcrypt.compare(
      req.body.password,
      exisistingUser.password
    );
    if (!isEqual) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign(
      { _id: exisistingUser._id },
      process.env.JWT_SECRET_KEY
    );
    console.log("token", token);
    exisistingUser.token = token;
    await exisistingUser.save();
    return res
      .cookie("token", token, {
        secure: true,
        httpOnly: true,
      })
      .send(exisistingUser);
  } catch (error) {
    return res.status(500).send(`error while Login.Try again Later`);
  }
};
const logout = async (req, res) => {
  try {
    req.user.token = undefined;
    await req.user.save();
  } catch (error) {
    return res.status(500).send(`error while Logout.Try again Later`);
  }
};
module.exports = {
  registerUser,
  login,
  logout,
};
