const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://users:root@cluster0.vnoq4f8.mongodb.net/ngodatabase"
);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("mongodb is connected");
});

connection.on("error", (error) => {
  console.log("Error is mongodb connection", error);
});

module.exports = mongoose;
