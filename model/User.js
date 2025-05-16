const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 3000
    }, Editor: {
      Admin: Number,
      Editor: Number
    }
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('User', userSchema)