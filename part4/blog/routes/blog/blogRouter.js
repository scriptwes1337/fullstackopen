const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require("../../models/Blog");

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
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
    const blog = new Blog(req.body);
    const data = await blog.save();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;