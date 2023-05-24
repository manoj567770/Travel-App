const express = require("express");
const hotelRouter = require("./routes/hotel.router");

const PORT = 3500;
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/hotels", hotelRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is started ${PORT}`);
});
