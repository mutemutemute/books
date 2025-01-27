const express = require("express");
const AppError = require("./utilities/appError");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const authorRouter = require("./routers/authorRouter");
const bookRouter = require("./routers/bookRouter");

// create server
const app = express();

// Middleware - parsed data to req.body.
app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/books", bookRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
});

app.use(errorHandler);

module.exports = app;
