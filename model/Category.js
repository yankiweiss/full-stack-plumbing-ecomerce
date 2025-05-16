const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('Category', categoriesSchema, 'categories')