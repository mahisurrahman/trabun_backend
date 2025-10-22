require("dotenv").config();
const notificationService = require("./notification.services");

// ✅ 1. Create Notification
const createNotification = async (req, res) => {
  try {
    const response = await notificationService.createNotification(req.body);
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Create Notification Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Create Controller Failed",
      data: [],
    });
  }
};

// ✅ 2. Get All Notifications
const getAllNotifications = async (req, res) => {
  try {
    const filter = req.query || {};
    const response = await notificationService.getAllNotifications(filter);
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Get All Notifications Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Fetch Controller Failed",
      data: [],
    });
  }
};

// ✅ 3. Get Notification By ID
const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await notificationService.getNotificationById(id);
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Get Notification By ID Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Fetch Controller Failed",
      data: [],
    });
  }
};

// ✅ 3. Get Notification By ID
const getNotificationByTaskIdAndUserId = async (req, res) => {
  try {
    const { taskId, userId } = req.body;
    const response = await notificationService.getNotificationByTaskIdAndUserId(
      taskId,
      userId
    );
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Get Notification By ID Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Fetch Controller Failed",
      data: [],
    });
  }
};

const geCommentNotificationByTaskIdAndUserId = async (req, res) => {
  try {
    const { taskId, userId } = req.body;
    const response = await notificationService.getCommentNotificationByTaskIdAndUserId(
      taskId,
      userId
    );
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Get Notification By ID Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Fetch Controller Failed",
      data: [],
    });
  }
};

// ✅ 3. Get Notification By ID
const readNotificationByTaskIdAndUserId = async (req, res) => {
  try {
    const { taskId, userId } = req.body;
    const response = await notificationService.readNotificationByTaskIdAndUserId(
      taskId,
      userId
    );
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Get Notification By ID Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Fetch Controller Failed",
      data: [],
    });
  }
};

const readCommentNotificationByTaskIdAndUserId = async (req, res) => {
  try {
    const { taskId, userId, commentId } = req.body;
    const response = await notificationService.readCommentNotificationByTaskIdAndUserId(
      taskId,
      userId,
      commentId,
    );
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Get Notification By ID Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Fetch Controller Failed",
      data: [],
    });
  }
};

// ✅ 4. Update Notification
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await notificationService.updateNotification(id, req.body);
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Update Notification Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Update Controller Failed",
      data: [],
    });
  }
};

// ✅ 5. Remove (Soft Delete) Notification
const removeNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await notificationService.removeNotification(id);
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Remove Notification Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Remove Controller Failed",
      data: [],
    });
  }
};

// ✅ 6. Delete (Hard Delete) Notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await notificationService.deleteNotification(id);
    res.status(response.status || 500).send(response);
  } catch (error) {
    console.error("Delete Notification Controller Failed:", error);
    res.status(500).send({
      error: true,
      status: 500,
      message: "Notification Delete Controller Failed",
      data: [],
    });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  removeNotification,
  deleteNotification,
  getNotificationByTaskIdAndUserId,
  readNotificationByTaskIdAndUserId,
  geCommentNotificationByTaskIdAndUserId,
  readCommentNotificationByTaskIdAndUserId,
};
