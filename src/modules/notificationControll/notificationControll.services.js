const notificationControllQueries = require("./notificationControll.queries");

// ✅ 1. Create Notification Control
const createNotficiationControll = async (data) => {
  try {
    const response =
      await notificationControllQueries.createNotificationControl(data);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Notification Control Created",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Notification Control Creation Failed",
        data: null,
      };
    }
  } catch (error) {
    console.error(error, "Create Notification Control Error");
    return {
      status: 500,
      error: true,
      message: "Notification Control Create Service Failed",
      data: null,
    };
  }
};

// ✅ 2. Get All
const getAllNotificationControlls = async () => {
  try {
    const data = await notificationControllQueries.getAllNotificationControls();
    return {
      status: 200,
      error: false,
      message: "Fetched All Notification Controls",
      data,
    };
  } catch (error) {
    console.error(error, "Get All Notification Controls Error");
    return {
      status: 500,
      error: true,
      message: "Failed to Fetch All Notification Controls",
      data: null,
    };
  }
};

// ✅ 3. Get By _id
const getNotificationControllById = async (id) => {
  try {
    const data = await notificationControllQueries.getNotificationControlById(
      id
    );
    if (!data)
      return {
        status: 404,
        error: true,
        message: "Notification Control Not Found",
        data: null,
      };
    return {
      status: 200,
      error: false,
      message: "Fetched Notification Control By ID",
      data,
    };
  } catch (error) {
    console.error(error, "Get Notification Control By ID Error");
    return {
      status: 500,
      error: true,
      message: "Failed to Fetch Notification Control By ID",
      data: null,
    };
  }
};

// ✅ 4. Get By TaskId
const getNotificationControllByTaskId = async (taskId) => {
  try {
    const data =
      await notificationControllQueries.getNotificationControlByTaskId(taskId);
    if (!data)
      return {
        status: 404,
        error: true,
        message: "Notification Control Not Found for TaskId",
        data: null,
      };
    return {
      status: 200,
      error: false,
      message: "Fetched Notification Control By TaskId",
      data,
    };
  } catch (error) {
    console.error(error, "Get Notification Control By TaskId Error");
    return {
      status: 500,
      error: true,
      message: "Failed to Fetch Notification Control By TaskId",
      data: null,
    };
  }
};

// ✅ 5. Add or Update Follower (Dynamic Control Type)
const addOrUpdateFollowerService = async (
  notificationId,
  receiverId,
  controlTypes
) => {
  try {
    const response = await notificationControllQueries.addOrUpdateFollower(
      notificationId,
      receiverId,
      controlTypes
    );
    return {
      status: 200,
      error: false,
      message: "Follower Added or Updated Successfully",
      data: response,
    };
  } catch (error) {
    console.error(error, "Add or Update Follower Error");
    return {
      status: 500,
      error: true,
      message: "Add or Update Follower Service Failed",
      data: null,
    };
  }
};

// ✅ 6. Remove Control Type(s) from Follower
const removeControlTypesFromFollowerService = async (
  notificationId,
  receiverId,
  controlTypes
) => {
  try {
    const response =
      await notificationControllQueries.removeControlTypesFromFollower(
        notificationId,
        receiverId,
        controlTypes
      );
    return {
      status: 200,
      error: false,
      message: "Control Types Removed from Follower Successfully",
      data: response,
    };
  } catch (error) {
    console.error(error, "Remove Control Types Error");
    return {
      status: 500,
      error: true,
      message: "Remove Control Types Service Failed",
      data: null,
    };
  }
};

// ✅ 7. Remove Follower Entirely
const removeFollowerService = async (notificationId, receiverId) => {
  try {
    const response = await notificationControllQueries.removeFollowerById(
      notificationId,
      receiverId
    );
    return {
      status: 200,
      error: false,
      message: "Follower Removed Successfully",
      data: response,
    };
  } catch (error) {
    console.error(error, "Remove Follower Error");
    return {
      status: 500,
      error: true,
      message: "Remove Follower Service Failed",
      data: null,
    };
  }
};

// ✅ 8. Remove All (Soft)
const removeAllNotificationControlls = async () => {
  try {
    const response =
      await notificationControllQueries.removeAllNotificationControls();
    return {
      status: 200,
      error: false,
      message: "All Notification Controls Soft-Removed Successfully",
      data: response,
    };
  } catch (error) {
    console.error(error, "Remove All Notification Controls Error");
    return {
      status: 500,
      error: true,
      message: "Remove All Notification Controls Service Failed",
      data: null,
    };
  }
};

// ✅ 9. Delete All (Hard)
const deleteAllNotificationControlls = async () => {
  try {
    const response =
      await notificationControllQueries.deleteAllNotificationControls();
    return {
      status: 200,
      error: false,
      message: "All Notification Controls Deleted Successfully",
      data: response,
    };
  } catch (error) {
    console.error(error, "Delete All Notification Controls Error");
    return {
      status: 500,
      error: true,
      message: "Delete All Notification Controls Service Failed",
      data: null,
    };
  }
};

// ✅ 10. Remove by _id (Soft)
const removeNotificationControllById = async (id) => {
  try {
    const response =
      await notificationControllQueries.removeNotificationControlById(id);
    return {
      status: 200,
      error: false,
      message: "Notification Control Soft-Removed Successfully",
      data: response,
    };
  } catch (error) {
    console.error(error, "Remove Notification Control by ID Error");
    return {
      status: 500,
      error: true,
      message: "Remove Notification Control by ID Service Failed",
      data: null,
    };
  }
};

// ✅ 11. Delete by _id (Hard)
const deleteNotificationControllById = async (id) => {
  try {
    const response =
      await notificationControllQueries.deleteNotificationControlById(id);
    return {
      status: 200,
      error: false,
      message: "Notification Control Deleted Successfully",
      data: response,
    };
  } catch (error) {
    console.error(error, "Delete Notification Control by ID Error");
    return {
      status: 500,
      error: true,
      message: "Delete Notification Control by ID Service Failed",
      data: null,
    };
  }
};

// ✅ Export All Services
module.exports = {
  createNotficiationControll,
  getAllNotificationControlls,
  getNotificationControllById,
  getNotificationControllByTaskId,
  addOrUpdateFollowerService,
  removeControlTypesFromFollowerService,
  removeFollowerService,
  removeAllNotificationControlls,
  deleteAllNotificationControlls,
  removeNotificationControllById,
  deleteNotificationControllById,
};
