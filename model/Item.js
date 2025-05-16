const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
