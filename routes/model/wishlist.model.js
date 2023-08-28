const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  hotelId: { type: String, required: true },
});

const wishList = mongoose.model("wishList", wishListSchema);
module.exports = wishList;
