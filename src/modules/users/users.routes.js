const express = require("express");
const router = express.Router();

const userController = require("./users.controller");
const userValidator = require("./users.validator");

router.post("/register", userValidator.createUser, userController.createUser);
router.get("/getAllUsers", userController.getAllUser);
router.get("/byId/:id", userController.getUserInfoById);
router.get("/remove/:id", userController.removeUserById);
router.post("/byType", userController.getUserByType);
router.get("/delete/byId/:id", userController.deleteUserById);
router.get("/deleteAll", userController.deleteAllUser);

module.exports = router;
