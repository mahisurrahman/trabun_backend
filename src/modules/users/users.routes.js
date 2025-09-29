const express = require("express");
const router = express.Router();

const userController = require("./users.controller");
const userValidator = require("./users.validator");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post("/register", userValidator.createUser, userController.createUser);
router.post(
  "/auth/login",
  userValidator.loginUser,
  userController.loginUserContlr
);
router.get("/logout", authMiddleware, userController.logoutUserContrl);
router.get("/getAllUsers", userController.getAllUser);
router.get("/byId/:id", userController.getUserInfoById);
router.get("/remove/:id", userController.removeUserById);
router.post("/byType", userController.getUserByType);
router.get("/delete/byId/:id", userController.deleteUserById);
router.get("/deleteAll", userController.deleteAllUser);
router.get("/getUserInfo", authMiddleware, userController.getUserInfoContrl);

module.exports = router;
