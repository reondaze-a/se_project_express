const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


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
app.use("/users", require('./routes/users'));
app.use("/items", require('./routes/clothingItems'));
app.use("/items/:itemId", require('./routes/likes'));

// Central error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    message: statusCode === 500 ?  'Requested resource not found' : message,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})