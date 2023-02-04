const express = require("express");
const router = express.Router();
const Ngo = require("../models/NgoModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/add", upload.single("logo"), (req, res) => {
  const newLogo = new Ngo({
    logo: req.file.originalname,
  });
  console.log(req.file);
  res.send("Single file upload successfully");
});
