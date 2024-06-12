const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers)
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      name,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
