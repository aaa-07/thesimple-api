const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  achieve: {
    desc: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  services: {
    desc: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  budget: {
    desc: {
      type: String,
    },
    value: {
      type: String,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
