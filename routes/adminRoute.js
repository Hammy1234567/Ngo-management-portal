const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Ngo = require("../models/NgoModel");
const authmiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-ngos", authmiddleware, async (req, res) => {
  try {
    const ngos = await Ngo.find({});
    res.status(200).send({
      message: "Ngos fetched successfully",
      success: true,
      data: ngos,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error applying Ngo account", success: false, error });
  }
});

router.get("/get-all-users", authmiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error applying Ngo account", success: false, error });
  }
});

router.post("/change-ngo-account-status", authmiddleware, async (req, res) => {
  try {
    const { ngoId, status } = req.body;
    const ngo = await Ngo.findByIdAndUpdate(ngoId, {
      status,
    });

    const user = await User.findOne({ _id: ngo.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-ngo-request-changed",
      message: `Your Ngo account has been ${status}`,
      onClickPath: "/notifications",
    });
    user.isNgo = status === "approved" ? true : false;
    await user.save();

    res.status(200).send({
      message: "Ngo status updated successfully",
      success: true,
      data: ngo,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error applying Ngo account", success: false, error });
  }
});
module.exports = router;
