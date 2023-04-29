const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, 'Game Name is required'] },
      category: { type: String, require: [true, 'Category is required'] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, 'Coin Name is required'] },
      coinQuantity: {
        type: String,
        require: [true, 'Coin Quantity is required'],
      },
      price: { type: Number },
    },
    historyPayment: {
      name: { type: String, require: [true, 'Name is required'] },
      type: { type: String, require: [true, 'Type is required'] },
      bankName: { type: String, require: [true, 'Bank Name is required'] },
      noRekening: { type: String, require: [true, 'no Rekening is required'] },
    },
    name: {
      type: String,
      require: [true, 'Name is required'],
    },
    accountUser: {
      type: String,
      require: [true, 'Account User is required'],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    historyUser: {
      name: { type: String, require: [true, 'Name is required'] },
      phoneNumber: {
        type: String,
        require: [true, 'Phone Number is required'],
        maxlength: 13,
        minlength: 10,
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
