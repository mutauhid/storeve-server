const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email is required"],
    },
    name: {
      type: String,
      require: [true, "nameis required"],
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
    phoneNumber: {
      type: String,
      require: [true, "Phone Number is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
