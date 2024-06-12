const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require("../../models/Blog");

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB: ", err);
  }
};

connectMongo();

router.get("/api/blogs", async (req, res, next) => {
  try {
    const data = await Blog.find();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/api/blogs", async (req, res, next) => {
  try {
    if (!req.body.likes) {
      req.body.likes = 0;
    }

    if (!req.body.title || !req.body.url) {
      return res.status(400).json({ error: "Title or URL missing." });
    }

    const blog = new Blog(req.body);
    const data = await blog.save();
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/api/blogs/:id", async (req, res, next) => {
  try {
    const requestedId = req.params["id"];
    const data = await Blog.findByIdAndDelete(requestedId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
