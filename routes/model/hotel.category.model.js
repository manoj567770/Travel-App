const mongoose = require("mongoose");

const hotelCatogorySchema = new mongoose.Schema({
  category: { type: String, required: true },
});
const hotelCategory = mongoose.model("Category", hotelCatogorySchema);
module.exports = hotelCategory;
