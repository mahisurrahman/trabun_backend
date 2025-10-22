const express = require("express");
const router = express.Router();
const notificationController = require("./notification.controller");

router.post("/create", notificationController.createNotification);
router.get("/all", notificationController.getAllNotifications);
router.post(
  "/getByTask",
  notificationController.getNotificationByTaskIdAndUserId
);
router.post(
  "/comment/getByTaskIdAndUserId",
  notificationController.geCommentNotificationByTaskIdAndUserId
);
router.post("/read/byTask", notificationController.readNotificationByTaskIdAndUserId);
router.get("/byId/:id", notificationController.getNotificationById);
router.post("/update/:id", notificationController.updateNotification);
router.get("/remove/:id", notificationController.removeNotification);
router.get("/delete/:id", notificationController.deleteNotification);

module.exports = router;
