const express = require("express");
const router = express.Router();

const hotelDataFromDB = require("./model/hotel.model");

router.route("/").get(async (req, res) => {
  const hotels = await hotelDataFromDB.find({});
  try {
    hotels
      ? res.json(hotels)
      : res.status(404).json({ message: "data not found" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
