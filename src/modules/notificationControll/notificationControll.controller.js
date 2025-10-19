const notificationControllService = require("./notificationControll.services");

// ✅ 1. Create Notification Control
const createNotificationControll = async (req, res) => {
  try {
    const response =
      await notificationControllService.createNotficiationControll(req.body);
    res.send(response);
  } catch (error) {
    console.error(error, "Create Notification Control Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Notification Control Create Controller Failed",
      data: [],
    });
  }
};

// ✅ 2. Get All
const getAllNotificationControlls = async (req, res) => {
  try {
    const response =
      await notificationControllService.getAllNotificationControlls();
    res.send(response);
  } catch (error) {
    console.error(error, "Get All Notification Controls Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Get All Notification Controls Controller Failed",
      data: [],
    });
  }
};

// ✅ 3. Get By _id
const getNotificationControllById = async (req, res) => {
  try {
    const { id } = req.params;
    const response =
      await notificationControllService.getNotificationControllById(id);
    res.send(response);
  } catch (error) {
    console.error(error, "Get Notification Control By ID Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Get Notification Control By ID Controller Failed",
      data: [],
    });
  }
};

// ✅ 4. Get By TaskId
const getNotificationControllByTaskId = async (req, res) => {
  try {
    const { taskId } = req.params;
    const response =
      await notificationControllService.getNotificationControllByTaskId(taskId);
    res.send(response);
  } catch (error) {
    console.error(
      error,
      "Get Notification Control By TaskId Controller Failed"
    );
    res.send({
      error: true,
      status: 500,
      message: "Get Notification Control By TaskId Controller Failed",
      data: [],
    });
  }
};

// ✅ 5. Add or Update Follower (Dynamic Control Types)
const addOrUpdateFollower = async (req, res) => {
  try {
    const { notificationId, receiverId, controlTypes } = req.body;
    const response =
      await notificationControllService.addOrUpdateFollowerService(
        notificationId,
        receiverId,
        controlTypes
      );
    res.send(response);
  } catch (error) {
    console.error(error, "Add or Update Follower Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Add or Update Follower Controller Failed",
      data: [],
    });
  }
};

// ✅ 6. Remove Control Types from Follower
const removeControlTypesFromFollower = async (req, res) => {
  try {
    const { notificationId, receiverId, controlTypes } = req.body;
    const response =
      await notificationControllService.removeControlTypesFromFollowerService(
        notificationId,
        receiverId,
        controlTypes
      );
    res.send(response);
  } catch (error) {
    console.error(error, "Remove Control Types Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Remove Control Types Controller Failed",
      data: [],
    });
  }
};

// ✅ 7. Remove Follower Entirely
const removeFollower = async (req, res) => {
  try {
    const { notificationId, receiverId } = req.body;
    const response = await notificationControllService.removeFollowerService(
      notificationId,
      receiverId
    );
    res.send(response);
  } catch (error) {
    console.error(error, "Remove Follower Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Remove Follower Controller Failed",
      data: [],
    });
  }
};

// ✅ 8. Remove All (Soft)
const removeAllNotificationControlls = async (req, res) => {
  try {
    const response =
      await notificationControllService.removeAllNotificationControlls();
    res.send(response);
  } catch (error) {
    console.error(error, "Remove All Notification Controls Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Remove All Notification Controls Controller Failed",
      data: [],
    });
  }
};

// ✅ 9. Delete All (Hard)
const deleteAllNotificationControlls = async (req, res) => {
  try {
    const response =
      await notificationControllService.deleteAllNotificationControlls();
    res.send(response);
  } catch (error) {
    console.error(error, "Delete All Notification Controls Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Delete All Notification Controls Controller Failed",
      data: [],
    });
  }
};

// ✅ 10. Remove by _id (Soft)
const removeNotificationControllById = async (req, res) => {
  try {
    const { id } = req.params;
    const response =
      await notificationControllService.removeNotificationControllById(id);
    res.send(response);
  } catch (error) {
    console.error(error, "Remove Notification Control By ID Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Remove Notification Control By ID Controller Failed",
      data: [],
    });
  }
};

// ✅ 11. Delete by _id (Hard)
const deleteNotificationControllById = async (req, res) => {
  try {
    const { id } = req.params;
    const response =
      await notificationControllService.deleteNotificationControllById(id);
    res.send(response);
  } catch (error) {
    console.error(error, "Delete Notification Control By ID Controller Failed");
    res.send({
      error: true,
      status: 500,
      message: "Delete Notification Control By ID Controller Failed",
      data: [],
    });
  }
};

// ✅ Export all controllers
module.exports = {
  createNotificationControll,
  getAllNotificationControlls,
  getNotificationControllById,
  getNotificationControllByTaskId,
  addOrUpdateFollower,
  removeControlTypesFromFollower,
  removeFollower,
  removeAllNotificationControlls,
  deleteAllNotificationControlls,
  removeNotificationControllById,
  deleteNotificationControllById,
};
