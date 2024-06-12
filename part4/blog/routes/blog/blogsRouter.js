const express = require("express");
const router = express.Router();
const Blog = require("../../models/Blog");

router.get("/", async (req, res, next) => {
  try {
    const data = await Blog.find();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
  try {
    const requestedId = req.params["id"];
    const data = await Blog.findByIdAndDelete(requestedId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const requestedId = req.params["id"];
    const updatedBlog = req.body;
    const data = await Blog.findByIdAndUpdate(requestedId, updatedBlog);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
