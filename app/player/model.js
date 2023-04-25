const mongoose = require('mongoose');

const playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'email is required'],
    },
    name: {
      type: String,
      require: [true, 'nameis required'],
    },
    userName: {
      type: String,
      require: [true, 'nameis required'],
      maxlength: 16,
      minlength: 4,
    },
    password: {
      type: String,
      require: [true, 'password is required'],
      maxlength: 25,
      minlength: 4,
    },
    phoneNumber: {
      type: String,
      require: [true, 'Phone Number is required'],
      maxlength: 13,
      minlength: 9,
    },
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
