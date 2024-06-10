var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const personsRouter = require("./routes/persons");
const cors = require("cors");

var app = express();

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

app.use("/", personsRouter);

module.exports = app;
