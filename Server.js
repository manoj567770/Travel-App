const express = require("express");
const mongoose = require("mongoose");
const hotelRouter = require("./routes/hotel.router");
const connectDB = require("./config/dbconfig");
const hotelDataAddedInDataBase = require("./routes/dataimport.router");
const categoryDataAddedInDataBase = require("./routes/dataImportCategory.router");
const categoryRouter = require("./routes/category.router");

const PORT = 3500;
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/hotels", hotelRouter);
app.use("/api/hotelCategory", categoryRouter);
app.use("/api/hotelsdata", hotelDataAddedInDataBase);
app.use("/api/hotelcategory", categoryDataAddedInDataBase);

mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(process.env.PORT || PORT, () => {
    console.log(`server is started ${PORT}`);
  });
});
