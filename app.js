const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');


const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');

// Mock user authentication middleware
app.use((req, res, next) => {
  req.user = {
    _id: '688a437291e0127401a67d49'
  };
  next();
});


// Importing routes
app.use("/", routes);


// Central error handling middleware
app.use((req, res, next) => {
  const err = new Error("Requested resource not found");
  err.statusCode = 404;
  next(err);
});

/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message: statusCode === 500 ?  'An internal server error has occured' : message,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})