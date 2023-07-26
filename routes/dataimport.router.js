const express = require("express");
const mongoose = require("mongoose");

const Hotel = require("../routes/model/hotel.model");
const Hotels = require("../data/hotels");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    await Hotel.remove();
    const hotelsInDB = await Hotel.insertMany(Hotels.data);
    res.json(hotelsInDB);
  } catch (err) {
    console.log(err);
    res.json({ message: "could not add data to DB" });
  }
});
module.exports = router;
