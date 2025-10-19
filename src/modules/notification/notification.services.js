const notificationQueries = require("./notification.queries");

// ✅ 1. Create Notification
const createNotification = async (data) => {
  try {
    const response = await notificationQueries.createNotification(data);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Notification Created",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Notification Creation Failed",
        data: null,
      };
    }
  } catch (error) {
    console.error(error, "Create Notification Error");
    return {
      status: 500,
      error: true,
      message: "Notification Create Service Failed",
      data: null,
    };
  }
};

// ✅ 2. Get All Notifications
const getAllNotifications = async (filter = {}) => {
  try {
    const response = await notificationQueries.getAllNotifications(filter);
    return {
      status: 200,
      error: false,
      message: "Notifications Fetched Successfully",
      data: response,
    };
  } catch (error) {
    console.error(error, "Get All Notifications Error");
    return {
      status: 500,
      error: true,
      message: "Notification Fetch Service Failed",
      data: null,
    };
  }
};

// ✅ 3. Get Notification By ID
const getNotificationById = async (id) => {
  try {
    const response = await notificationQueries.getNotificationById(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Notification Found",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Notification Not Found",
        data: null,
      };
    }
  } catch (error) {
    console.error(error, "Get Notification By ID Error");
    return {
      status: 500,
      error: true,
      message: "Notification Fetch Service Failed",
      data: null,
    };
  }
};

// ✅ 4. Update Notification
const updateNotification = async (id, updateData) => {
  try {
    const response = await notificationQueries.updateNotification(
      id,
      updateData
    );
    if (response.success) {
      return {
        status: 200,
        error: false,
        message: response.message,
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: response.message,
        data: null,
      };
    }
  } catch (error) {
    console.error(error, "Update Notification Error");
    return {
      status: 500,
      error: true,
      message: "Notification Update Service Failed",
      data: null,
    };
  }
};

// ✅ 5. Remove (Soft Delete) Notification
const removeNotification = async (id) => {
  try {
    const response = await notificationQueries.removeNotification(id);
    if (response.success) {
      return {
        status: 200,
        error: false,
        message: response.message,
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: response.message,
        data: null,
      };
    }
  } catch (error) {
    console.error(error, "Remove Notification Error");
    return {
      status: 500,
      error: true,
      message: "Notification Remove Service Failed",
      data: null,
    };
  }
};

// ✅ 6. Delete (Hard Delete) Notification
const deleteNotification = async (id) => {
  try {
    const response = await notificationQueries.deleteNotification(id);
    if (response.success) {
      return {
        status: 200,
        error: false,
        message: response.message,
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: response.message,
        data: null,
      };
    }
  } catch (error) {
    console.error(error, "Delete Notification Error");
    return {
      status: 500,
      error: true,
      message: "Notification Delete Service Failed",
      data: null,
    };
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  removeNotification,
  deleteNotification,
};
