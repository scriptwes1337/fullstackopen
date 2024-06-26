const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Blog = require("../../models/Blog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find().populate("blogs", { likes: 0, user: 0 });

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const requestedId = req.params["id"];
    const user = await User.findById(requestedId).populate("blogs");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const existingUser = await User.findOne({ username });

    // verifies username is unique
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    if (username.length < 3 || password.length < 3) {
      return res.status(400).json({
        error: "Username and password must be at least 3 characters long.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      name,
      password: hashedPassword,
      blogs: [],
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).send({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
