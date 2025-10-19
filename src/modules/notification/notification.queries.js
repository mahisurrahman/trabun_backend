require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");

// =============================
// ✅ CREATE NOTIFICATION
// =============================
const createNotification = async (data) => {
  const db = await connectDB();
  const { notificationControllerId, assignToId, notificationType, message } =
    data;

  const notification = {
    receiverId: assignToId,
    notificationType,
    message,
    isRead: false,
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: null,
  };

  const result = await db.collection("notifications").insertOne(notification);
  return { ...notification, _id: result.insertedId };
};

// =============================
// ✅ Seen NOTIFICATIONS
// =============================
const seenNotifications = async (id) => {
  const db = await connectDB();
  const notifications = await db
    .collection("notifications")
    .find({ isDeleted: false, ...filter })
    .sort({ createdAt: -1 })
    .toArray();
  return notifications;
};

// =============================
// ✅ GET ALL NOTIFICATIONS
// =============================
const getAllNotifications = async (filter = {}) => {
  const db = await connectDB();
  const notifications = await db
    .collection("notifications")
    .find({ isDeleted: false, ...filter })
    .sort({ createdAt: -1 })
    .toArray();
  return notifications;
};

// =============================
// ✅ GET SINGLE NOTIFICATION
// =============================
const getNotificationById = async (id) => {
  const db = await connectDB();
  const notification = await db
    .collection("notifications")
    .findOne({ _id: new ObjectId(id), isDeleted: false });
  return notification;
};

// =============================
// ✅ UPDATE NOTIFICATION
// (e.g., mark as read or edit message/type)
// =============================
const updateNotification = async (id, updateData) => {
  const db = await connectDB();

  const allowedFields = ["isRead", "notificationType", "message", "isActive"];
  const updateFields = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined)
      updateFields[field] = updateData[field];
  }

  const result = await db.collection("notifications").updateOne(
    { _id: new ObjectId(id), isDeleted: false },
    {
      $set: { ...updateFields, updatedAt: new Date() },
    }
  );

  return result.modifiedCount > 0
    ? { success: true, message: "Notification updated successfully" }
    : { success: false, message: "No notification updated" };
};

// =============================
// ✅ SOFT DELETE (REMOVE)
// =============================
const removeNotification = async (id) => {
  const db = await connectDB();

  const result = await db.collection("notifications").updateOne(
    { _id: new ObjectId(id), isDeleted: false },
    {
      $set: {
        isDeleted: true,
        isActive: false,
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0
    ? { success: true, message: "Notification removed successfully" }
    : { success: false, message: "No notification found to remove" };
};

// =============================
// ✅ HARD DELETE (PERMANENT DELETE)
// =============================
const deleteNotification = async (id) => {
  const db = await connectDB();
  const result = await db
    .collection("notifications")
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount > 0
    ? { success: true, message: "Notification permanently deleted" }
    : { success: false, message: "Notification not found" };
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  removeNotification,
  deleteNotification,
};
