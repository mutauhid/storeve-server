const mongoose = require('mongoose');

const bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Name is required'],
    },
    bankName: {
      type: String,
      require: [true, 'Bank Name is required'],
    },
    noRekening: {
      type: String,
      require: [true, 'No Rekening is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bank', bankSchema);
