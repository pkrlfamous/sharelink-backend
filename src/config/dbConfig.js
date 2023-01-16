const dotenv = require('dotenv');
dotenv.config();

const mongoose = require("mongoose");

module.exports = function () {
  try {
    const url = process.env.MONGO_URI_ONLINE;
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("connected to the database"))
      .catch((err) => console.error("could not connect to db..", err));
  } catch (err) {
    console.log(err);
  }
};