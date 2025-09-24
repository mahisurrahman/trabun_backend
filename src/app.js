const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const userRoutes = require("./modules/users/users.routes");
const responseMiddleware = require("./middlewares/responseMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const publicDir = process.env.PUBLIC_DIR || "public";
app.use(express.static(path.join(__dirname, "..", publicDir)));

app.get("/", (req, res) => {
  res.send("Server Initiated Smoothly !!!");
});

app.use(responseMiddleware);
app.use("/api/v1/user", userRoutes);

module.exports = app;
