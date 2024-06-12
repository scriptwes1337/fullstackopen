const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const tokenExtractor = require("./middleware/tokenExtractor");

// Import routes
const blogsRouter = require("./routes/blog/blogsRouter");
const usersRouter = require("./routes/users/usersRouter");

// Use express
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Token Extractor middleware
app.use(tokenExtractor);

// Use routes
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

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

module.exports = app;
