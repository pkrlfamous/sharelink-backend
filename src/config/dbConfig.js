const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://doadmin:GW062jv75qr41Ma9@db-mongodb-blr1-68121-4775f21d.mongo.ondigitalocean.com/admin?tls=true&authSource=admin",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected to the database"))
    .catch((err) => console.error("could not connect to db..", err));
};
