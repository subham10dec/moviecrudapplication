const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieparser = require("cookie-parser");
require("./db");
const app = express();
const PORT = 3030;

const movieRoute = require("./routes/movie");
const userRoute = require("./routes/user");
app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use("/api", movieRoute);
app.use("/api/auth", userRoute);
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "users.json"));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
