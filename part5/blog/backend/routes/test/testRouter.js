const express = require("express");
const router = express.Router();
const Blog = require("../../models/Blog");
const User = require("../../models/User");

router.post("/reset", async (req, res) => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();

    res.status(204).end()
  } catch (err) {
    console.log("Failed POST to reset endpoint: ", err.message);
  }
});

module.exports = router;
