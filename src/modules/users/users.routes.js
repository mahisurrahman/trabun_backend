const express = require("express");
const router = express.Router();

const userController = require("./users.controller");
const userValidator = require("./users.validator");

router.post("/register", userValidator.createUser, userController.createUser);

module.exports = router;
