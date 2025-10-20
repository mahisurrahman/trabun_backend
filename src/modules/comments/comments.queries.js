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
    commentedOnTime,
    isActive: true,
    isDelete: false,
    createdAt: new Date(),
    updatedAt: null,
  };

  const response = await db.collection("comments").insertOne(newComment);

  const notificationControl = await db
    .collection("notificationControl")
    .findOne({ taskId: new ObjectId(taskId), isActive: true, isDelete: false });

  if (!notificationControl) {
    console.warn("No notification control found for this task.");
    return {
      ...newComment,
      _id: response.insertedId,
    };
  }

  let followers = notificationControl.followers || [];

  const existingFollowerIndex = followers.findIndex(
    (f) => f.receiverId.toString() === userId.toString()
  );

  if (existingFollowerIndex === -1) {
    followers.push({
      receiverId: new ObjectId(userId),
      controlType: [1, 2, 3],
    });
  } else {
    const existing = followers[existingFollowerIndex];
    const mergedTypes = Array.from(new Set([...existing.controlType, 1, 2, 3]));
    followers[existingFollowerIndex].controlType = mergedTypes;
  }

  const uniqueMap = new Map();
  followers.forEach((f) => {
    const id = f.receiverId.toString();
    if (uniqueMap.has(id)) {
      const existing = uniqueMap.get(id);
      const mergedTypes = Array.from(
        new Set([...existing.controlType, ...f.controlType])
      );
      uniqueMap.set(id, { receiverId: f.receiverId, controlType: mergedTypes });
    } else {
      uniqueMap.set(id, f);
    }
  });

  followers = Array.from(uniqueMap.values());

  await db.collection("notificationControl").updateOne(
    { _id: notificationControl._id },
    {
      $set: {
        followers,
        updatedAt: new Date(),
      },
    }
  );

  const filteredFollowers = followers.filter(
    (f) => f.receiverId.toString() !== userId.toString()
  );

  await Promise.all(
    filteredFollowers.map((follower) =>
      notificationQueries.createNotification({
        notificationControllerId: notificationControl._id,
        assignToId: follower.receiverId,
        notificationType: 2, // e.g. comment notification
        message: `New comment on task: ${notificationControl.taskTitle}`,
      })
    )
  );

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
