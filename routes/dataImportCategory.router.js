const express = require("express");
const mongoose = require("mongoose");

const hotelCategory = require("./model/hotel.category.model");
const category = require("../data/categories");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    //await hotelCategory.remove();
    const hotelsCategoryInDB = await hotelCategory.insertMany(category.data);
    res.json(hotelsCategoryInDB);
  } catch (err) {
    console.log(err);
    res.json({ message: "could not add data to DB" });
  }
});
module.exports = router;
