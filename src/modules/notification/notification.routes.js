const express = require("express");
const router = express.Router();
const notificationController = require("./notification.controller");

router.post("/create", notificationController.createNotification);
router.get("/all", notificationController.getAllNotifications);
router.get("/byId/:id", notificationController.getNotificationById);
router.post("/update/:id", notificationController.updateNotification);
router.get("/remove/:id", notificationController.removeNotification);
router.get("/delete/:id", notificationController.deleteNotification);

module.exports = router;
