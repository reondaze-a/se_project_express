const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [30, "Name cannot be longer than 30 characters"],
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new AuthenticationError('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then(matched => {
          if (!matched) {
            return Promise.reject(new AuthenticationError('Incorrect email or password'));
          }
          return user;
        });
    });
}

module.exports = mongoose.model("user", userSchema);
