const express = require("express");
const { registerUser, login, logout } = require("../controllers/user");
const authMiddleware = require("../middlewares/authMiddleware");

const Router = express.Router();

Router.post("/register", registerUser);

Router.post("/login", login);
Router.post("/logout", authMiddleware, logout);

module.exports = Router;
