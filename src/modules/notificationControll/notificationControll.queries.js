require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");
const notificationQueries = require("../notification/notification.queries");

// ✅ Create Notification Control
const createNotificationControl = async (data) => {
  const Db = await connectDB();
  const { taskId, taskTitle, taskActive, assignedById, assignedToId } = data;

  let followers = [];
  followers.push({
    receiverId: assignedToId,
    controlType: [1, 2, 3],
  });
  if (assignedById !== assignedToId) {
    followers.push({
      receiverId: assignedById,
      controlType: [1],
    });
  }

  const payload = {
    taskId,
    taskTitle,
    taskActive,
    followers,
    isActive: true,
    isDelete: false,
    status: true,
    createdAt: new Date(),
    updatedAt: null,
  };

  const result = await Db.collection("notificationControl").insertOne(payload);
  if (result.insertedId) {
    for (const follower of followers) {
      await notificationQueries.createNotification({
        taskId: payload.taskId,
        assignToId: follower.receiverId,
        taskTitle: payload.taskTitle,
        notificationType: 1,
        message: `New task created for: ${taskTitle}`,
      });
    }
  }
  return result;
};

// ✅ 1. Get All
const getAllNotificationControls = async () => {
  const Db = await connectDB();
  return await Db.collection("notificationControl").find({}).toArray();
};

// ✅ 2. Get by _id
const getNotificationControlById = async (id) => {
  const Db = await connectDB();
  return await Db.collection("notificationControl").findOne({
    _id: new ObjectId(id),
  });
};

// ✅ 3. Get by TaskId
const getNotificationControlByTaskId = async (taskId) => {
  const Db = await connectDB();

  const result = await Db.collection("notificationControl").findOne({ taskId });
  if (!result) return null;

  const receiverIds = result.followers?.map((f) => f.receiverId) || [];

  const objectIds = receiverIds.map((id) => new ObjectId(id));
  const users = await Db.collection("users")
    .find({ _id: { $in: objectIds } })
    .toArray();

  const populatedFollowers = result.followers.map((follower) => {
    const user = users.find(
      (u) => u._id.toString() === follower.receiverId.toString()
    );
    return {
      ...follower,
      receiverData: user
        ? {
            ...user,
          }
        : null,
    };
  });

  // Blank Commit
  return {
    ...result,
    followers: populatedFollowers,
  };
};

//HAndling deploy//

// ✅ 4. Add or Update Follower (Dynamic Control Types)
const addOrUpdateFollower = async (taskId, receiverId, controlTypes) => {
  const Db = await connectDB();

  // Try to add control types if follower already exists
  const result = await Db.collection("notificationControl").updateOne(
    {
      taskId: taskId,
      "followers.receiverId": receiverId,
    },
    {
      $addToSet: { "followers.$.controlType": { $each: controlTypes } },
      $set: { updatedAt: new Date() },
    }
  );

  // If follower didn't exist, push new one
  if (result.matchedCount === 0) {
    return await Db.collection("notificationControl").updateOne(
      { _id: new ObjectId(notificationId) },
      {
        $push: {
          followers: { receiverId, controlType: controlTypes },
        },
        $set: { updatedAt: new Date() },
      }
    );
  }

  return result;
};

const removeControlTypesFromFollower = async (
  taskId,
  receiverId,
  controlTypes
) => {
  const Db = await connectDB();

  const typesArray = Array.isArray(controlTypes)
    ? controlTypes
    : [controlTypes];

  const result = await Db.collection("notificationControl").updateOne(
    {
      taskId: taskId,
      "followers.receiverId": receiverId,
    },
    {
      $pull: { "followers.$.controlType": { $in: typesArray } },
      $set: { updatedAt: new Date() },
    }
  );

  return result;
};

// ✅ 6. Remove a Follower Entirely
const removeFollowerById = async (notificationId, receiverId) => {
  const Db = await connectDB();

  return await Db.collection("notificationControl").updateOne(
    { _id: new ObjectId(notificationId) },
    {
      $pull: { followers: { receiverId } },
      $set: { updatedAt: new Date() },
    }
  );
};

// ✅ 7. Remove All (Soft Remove)
const removeAllNotificationControls = async () => {
  const Db = await connectDB();
  return await Db.collection("notificationControl").updateMany(
    {},
    {
      $set: { isActive: false, updatedAt: new Date() },
    }
  );
};

// ✅ 8. Delete All (Hard Delete)
const deleteAllNotificationControls = async () => {
  const Db = await connectDB();
  return await Db.collection("notificationControl").deleteMany({});
};

// ✅ 9. Remove by _id (Soft Remove)
const removeNotificationControlById = async (id) => {
  const Db = await connectDB();
  return await Db.collection("notificationControl").updateOne(
    { _id: new ObjectId(id) },
    { $set: { isActive: false, updatedAt: new Date() } }
  );
};

// ✅ 10. Delete by _id (Hard Delete)
const deleteNotificationControlById = async (id) => {
  const Db = await connectDB();
  return await Db.collection("notificationControl").deleteOne({
    _id: new ObjectId(id),
  });
};

// ✅ Export all methods
module.exports = {
  createNotificationControl,
  getAllNotificationControls,
  getNotificationControlById,
  getNotificationControlByTaskId,
  addOrUpdateFollower,
  removeControlTypesFromFollower,
  removeFollowerById,
  removeAllNotificationControls,
  deleteAllNotificationControls,
  removeNotificationControlById,
  deleteNotificationControlById,
};
