const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("./model/user.model");

router.route("/register").post(async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      number: req.body.number,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString(),
    });
    const existingUser = await User.findOne({ number: req.body.number });
    if (existingUser) {
      res.json({ message: "User Already Exist" });
    } else {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "user creating Error" });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const user = await User.findOne({ number: req.body.number });
    !user && res.status(401).json({ message: "Incorrect Mobile Number" });
    const decodedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    console.log(decodedPassword);
    decodedPassword !== req.body.password &&
      res.status(401).json({ message: "Incorrect Password" });

    const { password, ...rest } = user._doc;
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN
    );

    res.json({ ...rest, accessToken });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
