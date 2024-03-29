const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Ngo = require("../models/NgoModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middlewares/authMiddleware");
const stripe = require("stripe")(
  "sk_test_51MfKmlSIhGiutLcqCrtrjGjCqaWjdQIXlkMRINUKU83cCWVr524qrUPDuvU63lQRPNl1HfvYnYYVgAwHvSFGlDd700Im8TDBGd"
);

router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", authmiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting user information",
      success: false,
      error,
    });
  }
});

router.post("/apply-ngo-account", authmiddleware, async (req, res) => {
  try {
    const newngo = new Ngo({ ...req.body, status: "pending" });
    await newngo.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-ngo-request",
      message: `${newngo.name} has applied for Ngo account`,
      data: {
        ngoId: newngo._id,
        name: newngo.name + " ",
      },
      onClickPath: "/admin/ngoslist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Ngo account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error applying Ngo account", success: false, error });
  }
});

router.post(
  "/mark-all-notifications-as-seen",
  authmiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error applying Ngo account", success: false, error });
    }
  }
);

router.post("/delete-all-notifications", authmiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error applying Ngo account", success: false, error });
  }
});

router.get("/get-all-approved-ngos", authmiddleware, async (req, res) => {
  try {
    const ngos = await Ngo.find({ status: "approved" });
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

router.post("/create-payment-intent", authmiddleware, async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

module.exports = router;
