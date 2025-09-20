require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const { isCelebrateError } = require("celebrate");
const routes = require("./routes/index");
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { apiLimiter } = require("./middlewares/limiter")

const { NotFoundError } = require("./utils/errors")


const app = express();
const { PORT = 3001 } = process.env;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wtwr_db");

// Setup logger
app.use(requestLogger);
// setup limiter
app.use(apiLimiter)
// Importing routes
app.use("/", routes);

app.use((req, res, next) => { // non error route
  next(new NotFoundError("Requested resource not found"))
});
// enable error logger
app.use(errorLogger)

/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    const problems = [];

    // err.details
    err.details.forEach((joiError, segment) => {
      // joiError.details array
      joiError.details.forEach((d) => {
        problems.push({
          segment,
          field: d.path.join('.'),
          type: d.type,
          message: d.message,
        });
      });
    });

    const mainMessage = (problems[0] && problems[0].message) || 'Validation error';
    return res.status(400).json({ message: mainMessage, errors: problems });
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'An internal server error has occured' : err.message;
  return res.status(statusCode).json({ message });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
