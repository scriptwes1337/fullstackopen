var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

// Import routers
const personsRouter = require("./routes/persons");

// Use express server
var app = express();

// Middleware
logger.token("req-body", (req) => JSON.stringify(req.body));
app.use(
  logger(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.static("dist"));
app.use(errorHandler);

// Use routers
app.use("/", personsRouter);

// Use error handler
app.use(errorHandler);

module.exports = app;
