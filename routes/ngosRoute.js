const express = require("express");
const router = express.Router();
const Ngo = require("../models/NgoModel");
const authmiddleware = require("../middlewares/authMiddleware");

router.post("/get-ngo-info-by-user-id", authmiddleware, async (req, res) => {
  try {
    const ngo = await Ngo.findOne({ userId: req.body.userId });
    res.status(200).send({
      message: "Ngo information fetched successfully",
      success: true,
      data: ngo,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting ngo information",
      success: false,
      error,
    });
  }
});

router.post("/get-ngo-info-by-id", authmiddleware, async (req, res) => {
  try {
    const ngo = await Ngo.findOne({ _id: req.body.ngoId });
    res.status(200).send({
      message: "Ngo information fetched successfully",
      success: true,
      data: ngo,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting ngo information",
      success: false,
      error,
    });
  }
});

router.post("/update-ngo-profile", authmiddleware, async (req, res) => {
  try {
    const ngo = await Ngo.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      message: "Ngo profile updated successfully",
      success: true,
      data: ngo,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error  ngo information",
      success: false,
      error,
    });
  }
});
module.exports = router;
