// EVERYTIME TO FOR PORT FAILURE
// taskkill /F /IM node.exe

const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig.js");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const ngosRoute = require("./routes/ngosRoute");

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/ngo", ngosRoute);

const port = process.env.PORT || 5000;

console.log(process.env.MONGO_URL);
app.listen(port, () => console.log(`Node server started at port ${port}`));
