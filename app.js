const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const { errors, isCelebrateError } = require("celebrate");
const { requestLogger, errorLogger } = require('./middlewares/logger');
require("dotenv").config();

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wtwr_db");

// Setup logger
app.use(requestLogger);
// Importing routes
app.use("/", routes);

app.use((req, res) => { // non error route
  res.status(404).json({ message: "Requested resource not found" });
});
// enable error logger
app.use(errorLogger)

// centralized / fallback error handler
app.use((req, res) => {
  const err = new Error("Requested resource not found");
  err.statusCode = 404;
  res.send(err);
});

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    // Collect Joi details
    const problems = [];
    for (const [segment, joiError] of err.details) {
      for (const d of joiError.details) {
        problems.push({
          segment,
          field: d.path.join('.'),
          type: d.type,
          message: d.message,
        });
      }
    }

    const mainMessage = problems[0]?.message || 'Validation error'; // get the Joi message

    return res.status(400).json({
      message: mainMessage,        // Joi error message gets passed
      errors: problems,
    });
  }

  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message:
      statusCode === 500 ? "An internal server error has occured" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
