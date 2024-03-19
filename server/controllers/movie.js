const Movie = require("../models/movie");

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      user: req.user._id,
    });
    console.log(movies, "moviesvv");
    res.send(movies);
  } catch (err) {
    return res
      .status(500)
      .send(`error while getting lists of movies.Try again Later`);
  }
};

const getSingleMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    res.send(movie);
  } catch (err) {
    return res.status(500).send(`error while getting a movie.Try again Later`);
  }
};
const addMovie = async (req, res) => {
  try {
    const body = req.body;
    console.log("body", body);
    const movie = new Movie({ ...body, user: req.user._id });
    await movie.save();
    res.status(201).send(movie);
  } catch (err) {
    return res.status(500).send(`error while adding movie.Try again Later`);
  }
};

const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true }
    );
    return res.send(updatedMovie);
  } catch (error) {
    return res.status(500).send(`error while Updating movie.Try again Later`);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    return res.send(deletedMovie);
  } catch (error) {
    return res.status(500).send(`error while deleting movie.Try again Later`);
  }
};
module.exports = {
  getMovies,
  addMovie,
  getSingleMovie,
  updateMovie,
  deleteMovie,
};
