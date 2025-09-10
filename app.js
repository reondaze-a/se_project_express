const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const { errors } = require("celebrate");
require("dotenv").config();

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wtwr_db"); // The issue was probably because I used a .env for the connection string and it doesn't get pushed.

// Importing routes
app.use("/", routes);

// Central error handling middleware
app.use(errors()); // Celebrate error handler

app.use((req, res) => {
  const err = new Error("Requested resource not found");
  err.statusCode = 404;
  res.send(err);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message:
      statusCode === 500 ? "An internal server error has occured" : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
