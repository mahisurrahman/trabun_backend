const express = require("express");
const router = express.Router();
const controller = require("./notificationControll.controller");

router.post("/create", controller.createNotificationControll);
router.get("/all", controller.getAllNotificationControlls);
router.get("/byId/:id", controller.getNotificationControllById);
router.get("/byTask/:taskId", controller.getNotificationControllByTaskId);
router.post("/addFollower", controller.addOrUpdateFollower);
router.post("/removeControlTypes", controller.removeControlTypesFromFollower);
router.post("/removeFollower", controller.removeFollower);
router.get("/removeAll", controller.removeAllNotificationControlls);
router.get("/deleteAll", controller.deleteAllNotificationControlls);
router.get("/remove/:id", controller.removeNotificationControllById);
router.get("/delete/:id", controller.deleteNotificationControllById);

module.exports = router;
