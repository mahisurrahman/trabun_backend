require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");
const notificationController = require("../notificationControll/notificationControll.queries");
const notification = require("../notification/notification.queries");

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
    taggedUsers = [],
  } = commentData;

  const db = await connectDB();

  const newComment = {
    taskLogId: new ObjectId(taskLogId),
    taskId: new ObjectId(taskId),
    comment: comment?.trim() || "",
    commentBy: author,
    userId: new ObjectId(userId),
    taskStatus: taskStatus || null,
    commentedOnTime,
    taggedUsers: taggedUsers.map((id) => new ObjectId(id)),
    isActive: true,
    isDelete: false,
    createdAt: new Date(),
    updatedAt: null,
  };

  const response = await db.collection("comments").insertOne(newComment);


  const notificationControl = await db
    .collection("notificationControl")
    .findOne({ taskId: taskId, isActive: true, isDelete: false });

  if (notificationControl) {
    let followers = notificationControl.followers || [];

    const commenterIdObj = new ObjectId(userId);
    const commenterIdStr = commenterIdObj.toString();
    const existingCommenterIndex = followers.findIndex(
      (f) => f.receiverId.toString() === commenterIdStr
    );

    if (existingCommenterIndex === -1) {
      followers.push({
        receiverId: commenterIdObj,
        controlType: [1, 2, 3],
      });
    } else {
      const existing = followers[existingCommenterIndex];
      const mergedTypes = Array.from(
        new Set([...existing.controlType, 1, 2, 3])
      );
      followers[existingCommenterIndex].controlType = mergedTypes;
    }

    taggedUsers.forEach((taggedId) => {
      const taggedIdObj = new ObjectId(taggedId);
      const taggedIdStr = taggedIdObj.toString();

      const existingTaggedIndex = followers.findIndex(
        (f) => f.receiverId.toString() === taggedIdStr
      );

      if (existingTaggedIndex === -1) {
        followers.push({
          receiverId: taggedIdStr,
          controlType: [1, 2, 3],
        });
      }
    });

    const uniqueFollowersMap = new Map();
    followers.forEach((f) => {
      const idStr = f.receiverId.toString();
      if (uniqueFollowersMap.has(idStr)) {
        const existing = uniqueFollowersMap.get(idStr);
        const mergedTypes = Array.from(
          new Set([...existing.controlType, ...f.controlType])
        );
        uniqueFollowersMap.set(idStr, {
          receiverId: f.receiverId,
          controlType: mergedTypes,
        });
      } else {
        uniqueFollowersMap.set(idStr, f);
      }
    });
    followers = Array.from(uniqueFollowersMap.values());

    await db.collection("notificationControl").updateOne(
      { _id: notificationControl._id },
      {
        $set: {
          followers,
          updatedAt: new Date(),
        },
      }
    );

    const followersToNotify = followers.filter(
      (f) => f.receiverId.toString() !== commenterIdStr
    );

    await Promise.all(
      followers.map((follower) =>
        notification.createNotification({
          taskId,
          assignToId: follower.receiverId,
          commentId: response.insertedId.toString(),
          notificationType: 2,
          message: `New comment on task: ${notificationControl.taskTitle}`,
        })
      )
    );
  } else {
    console.warn("No notification control found for taskId:", taskId);
  }

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
