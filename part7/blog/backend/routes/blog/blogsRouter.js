const express = require("express");
const router = express.Router();
const Blog = require("../../models/Blog");
const User = require("../../models/User");

router.get("/", async (req, res, next) => {
  try {
    const data = await Blog.find().populate("user", { blogs: 0 });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const requestedId = req.params["id"];
    const data = await Blog.findById(requestedId).populate("user");
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.id) {
      res.status(401).json({ error: "Invalid token!" });
    }

    if (!req.body.likes) {
      req.body.likes = 0;
    }

    if (!req.body.title || !req.body.url) {
      return res.status(400).json({ error: "Title or URL missing." });
    }

    const { title, author, url, likes } = req.body;

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user.id,
    });

    const savedBlog = await blog.save();
    const updatedUser = await User.findById(user.id);
    updatedUser.blogs.push(savedBlog._id);
    const savedUpdatedUser = await User.findByIdAndUpdate(user.id, updatedUser);

    res.status(201).json([savedBlog, savedUpdatedUser]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.id) {
      res.status(401).json({ error: "Invalid user!" });
    }

    const requestedId = req.params["id"];
    const findBlog = await Blog.findById(requestedId);

    if (user.id === String(findBlog.user)) {
      const data = await Blog.findByIdAndDelete(requestedId);
      res.status(200).json(data);
    } else {
      res
        .status(400)
        .json({ error: "You can only delete blogs that you created!" });
    }
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

router.put("/:id/comments", async (req, res, next) => {
  try {
    const requestedId = req.params["id"];
    const data = await Blog.findByIdAndUpdate(
      requestedId,
      { $push: { comments: req.body.comment } },
      { new: true },
    );
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
