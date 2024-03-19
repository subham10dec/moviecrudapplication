const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log("error connected db");
  });
