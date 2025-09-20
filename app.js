require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const { isCelebrateError } = require("celebrate");
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

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
