require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");
const notificationController = require("../notificationControll/notificationControll.queries");

// ======================
// 🟢 Create Comment
// ======================
const createComment = async (commentData) => {
  const {
    taskLogId,
    taskId,
    comment,
    userId,
    taskStatus,
    author,
    commentedOnTime,
  } = commentData;
  const db = await connectDB();

  const newComment = {
    taskLogId: new ObjectId(taskLogId),
    taskId: new ObjectId(taskId),
    comment: comment?.trim() || "",
    commentBy: author,
    userId: new ObjectId(userId),
    taskStatus: taskStatus || null,
    commentedOnTime: commentedOnTime,
    isActive: true,
    isDelete: false,
    createdAt: new Date(),
    updatedAt: null,
  };

  const response = await db.collection("comments").insertOne(newComment);
  // const ntifycntrl = await
  return {
    ...newComment,
    _id: response.insertedId,
  };
};

// ======================
// 🟢 Get All Comments
// ======================
const getAllComments = async () => {
  const db = await connectDB();
  return await db
    .collection("comments")
    .find({ isActive: true, isDelete: false })
    .sort({ createdAt: -1 })
    .toArray();
};

// ======================
// 🟢 Get Comments by Task ID
// ======================
const getCommentsByTaskId = async (taskId) => {
  const db = await connectDB();
  return await db
    .collection("comments")
    .find({
      taskId: new ObjectId(taskId),
      isActive: true,
      isDelete: false,
    })
    .sort({ createdAt: 1 })
    .toArray();
};

// ======================
// 🟢 Get Comments by Task Log ID
// ======================
const getCommentsByTaskLogId = async (taskLogId) => {
  const db = await connectDB();
  return await db
    .collection("comments")
    .find({
      taskLogId: new ObjectId(taskLogId),
      isActive: true,
      isDelete: false,
    })
    .sort({ createdAt: -1 })
    .toArray();
};

// ======================
// 🟢 Get Single Comment by ID
// ======================
const getCommentById = async (id) => {
  const db = await connectDB();
  return await db
    .collection("comments")
    .findOne({ _id: new ObjectId(id), isActive: true, isDelete: false });
};

// ======================
// 🟡 Update Comment
// ======================
const updateComment = async (id, updateData) => {
  const db = await connectDB();
  const updatedComment = {
    ...updateData,
    updatedAt: new Date(),
  };

  const response = await db
    .collection("comments")
    .updateOne(
      { _id: new ObjectId(id), isDelete: false },
      { $set: updatedComment }
    );

  return response.modifiedCount > 0 ? { _id: id, ...updatedComment } : null;
};

// ======================
// 🔴 Soft Delete Comment
// ======================
const removeComment = async (id) => {
  const db = await connectDB();
  const response = await db
    .collection("comments")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { isDelete: true, isActive: false, updatedAt: new Date() } }
    );
  return response.modifiedCount > 0;
};

// ======================
// ⚫ Hard Delete Comment
// ======================
const hardDeleteComment = async (id) => {
  const db = await connectDB();
  const response = await db
    .collection("comments")
    .deleteOne({ _id: new ObjectId(id) });
  return response.deletedCount > 0;
};

module.exports = {
  createComment,
  getAllComments,
  getCommentsByTaskId,
  getCommentsByTaskLogId,
  getCommentById,
  updateComment,
  removeComment,
  hardDeleteComment,
};
