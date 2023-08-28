const express = require("express");
const mongoose = require("mongoose");
const hotelRouter = require("./routes/hotel.router");
const connectDB = require("./config/dbconfig");
const hotelDataAddedInDataBase = require("./routes/dataimport.router");
const categoryDataAddedInDataBase = require("./routes/dataImportCategory.router");
const categoryRouter = require("./routes/category.router");
const singleHotelRouter = require("./routes/singleHotelRouter");
const authRouter = require("./routes/user.auth.router");
const wishList = require("./routes/wishlist.router");
const bodyParser = require("body-parser");

const PORT = 3500;
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(bodyParser.json());

app.use("/api/hotels", hotelRouter);
app.use("/api/hotelCategory", categoryRouter);
app.use("/api/hotelsdata", hotelDataAddedInDataBase);
app.use("/api/hotelcategory", categoryDataAddedInDataBase);
app.use("/api/hotels", singleHotelRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishList);

mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(process.env.PORT || PORT, () => {
    console.log(`server is started ${PORT}`);
  });
});
