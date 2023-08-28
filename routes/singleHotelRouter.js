const express = require("express");

const router = express.Router();
const Hotel = require("./model/hotel.model");

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const singleHotel = await Hotel.findById(id);
    if (singleHotel) {
      res.json(singleHotel);
    }
  } catch (err) {
    res.json({ message: "data could not found" });
  }
});

module.exports = router;
