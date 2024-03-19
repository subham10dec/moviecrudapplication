const express = require("express");
const Movie = require("../models/movie");
const {
  getMovies,
  addMovie,
  getSingleMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");
const authMiddleware = require("../middlewares/authMiddleware");

const Router = express.Router();

Router.get("/movies", authMiddleware, getMovies);

Router.get("/movies/:id", authMiddleware, getSingleMovie);

Router.post("/movies", authMiddleware, addMovie);

Router.patch("/movies/:id", authMiddleware, updateMovie);

Router.delete("/movies/:id", authMiddleware, deleteMovie);

module.exports = Router;
