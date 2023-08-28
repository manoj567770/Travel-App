const express = require("express");
const router = express.Router();

const wishList = require("./model/wishlist.model");
const verify = require("../middleware/verifyUser");

router.route("/").post(verify, async (req, res) => {
  try {
    const newWishList = new wishList(req.body);
    const savedWishList = await newWishList.save();
    res.status(201).json(savedWishList);
  } catch (err) {
    res.status(500).json({ message: "failed to create wishlist" });
  }
});

router.route("/:id").delete(verify, async (req, res) => {
  try {
    await wishList.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel delete from Wishlist" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Hotel could not delete from wishlist" });
  }
});

router.route("/").get(verify, async (req, res) => {
  try {
    const wishListHotel = await wishList.find({});
    wishListHotel
      ? res.json(wishListHotel)
      : res.json({ message: "No items found in the wishlist" });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
