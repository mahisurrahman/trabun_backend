require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");

const createTaskLog = async (data) => {
  const {
    startTime,
    assignedDate,
    expectedDuration,
    taskStatus,
    taskId,
    assignedToId,
    creatorId,
  } = data;

  const db = await connectDB();

  const taskLog = {
    taskId,
    startTime,
    endTime: 0,
    assignedDate,
    expectedDuration,
    totalDuration: 0,
    taskStatus,
    assignedToId,
    creatorId,
    assignedById: creatorId,
    isStateComplete: false,
    totalPendingTime: 0,
    totalInQueTime:0,
    totalOnGoingTime:0,
    totalReviewTime:0,
    status: true,
    isPause: false,
    isActive: true,
    isDelete: false,
    createdAt: new Date(),
    updatedAt: null,
  };

  const result = await db.collection("taskLogs").insertOne(taskLog);
  return { ...taskLog, _id: result.insertedId };
};

const getAllTaskLogs = async () => {
  const db = await connectDB();
  return await db
    .collection("taskLogs")
    .find({ isActive: true, isDelete: false })
    .toArray();
};

const getTaskLogsWithFilters = async (
  assignedToId,
  taskStatus,
  startDate,
  endDate
) => {
  const db = await connectDB();

  const filter = {
    assignedToId,
    taskStatus,
    createdAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
    isActive: true,
    isDelete: false,
  };

  const taskLogs = await db.collection("taskLogs").find(filter).toArray();

  if (!taskLogs || taskLogs.length === 0) return [];

  // Get unique task IDs from logs
  const taskIds = [...new Set(taskLogs.map((log) => log.taskId))];

  // Fetch the related tasks
  const tasks = await db
    .collection("tasks")
    .find({ _id: { $in: taskIds.map((id) => new ObjectId(id)) } })
    .project({
      taskTitle: 1,
      taskDescription: 1,
      taskPriority: 1,
      taskAssignedTo: 1,
      taskAssignedBy: 1,
      taskCreatedBy: 1,
      backlog: 1,
      expectedDeadline: 1,
      assignedDate: 1,
    })
    .toArray();

  // Map task IDs to their data
  const taskMap = tasks.reduce((acc, task) => {
    acc[task._id.toString()] = task;
    return acc;
  }, {});

  // Collect all user IDs (for one bulk query)
  const userIds = [
    ...new Set(
      tasks.flatMap((t) => [
        t.taskAssignedTo,
        t.taskAssignedBy,
        t.taskCreatedBy,
      ])
    ),
  ].filter(Boolean);

  // Fetch all related users
  const users = await db
    .collection("users")
    .find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } })
    .project({
      username: 1,
      email: 1,
      traId: 1,
      userType:1,
      // profileImage: 1,
      designation: 1,
      // department: 1,
    })
    .toArray();

  // Map users by ID
  const userMap = users.reduce((acc, user) => {
    acc[user._id.toString()] = user;
    return acc;
  }, {});

  // Return with user info added (but keeping your original structure)
  return taskLogs.map((log) => {
    const task = taskMap[log.taskId];
    if (!task) return log;

    return {
      ...log,
      assignedToId: task.taskAssignedTo || null,
      assignedById: task.taskAssignedBy || null,
      creatorId: task.taskCreatedBy || null,

      assignedToDetails: userMap[task.taskAssignedTo?.toString()] || null,
      assignedByDetails: userMap[task.taskAssignedBy?.toString()] || null,
      creatorDetails: userMap[task.taskCreatedBy?.toString()] || null,

      // Preserve your existing taskDetails structure
      taskDetails: {
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        taskPriority: task.taskPriority,
        backlog: task.backlog,
        expectedDeadline: task.expectedDeadline,
        assignedDate: task.assignedDate,
      },
    };
  });
};

const getTaskLogById = async (id) => {
  const db = await connectDB();
  return await db
    .collection("taskLogs")
    .findOne({ _id: new ObjectId(id), isActive: true, isDelete: false });
};

const getTaskLogAssignedToId = async (id) => {
  const db = await connectDB();
  return await db
    .collection("taskLogs")
    .findOne({ assignedToId: id, isActive: true, isDelete: false });
};

const getTaskLogAssignedById = async (id) => {
  const db = await connectDB();
  return await db
    .collection("taskLogs")
    .findOne({ assignedById: id, isActive: true, isDelete: false });
};

const getTaskLogCreatorId = async (id) => {
  const db = await connectDB();
  return await db
    .collection("taskLogs")
    .findOne({ creatorId: id, isActive: true, isDelete: false });
};

const getTaskLogByTaskId = async (id) => {
  const db = await connectDB();
  return await db
    .collection("taskLogs")
    .findOne({ taskId: id, isActive: true, isDelete: false });
};

const updateTaskLog = async (id, updateData) => {
  const db = await connectDB();
  updateData.updatedAt = new Date();
  const result = await db
    .collection("taskLogs")
    .findOneAndUpdate(
      { _id: new ObjectId(id), isActive: true, isDelete: false },
      { $set: updateData },
      { returnDocument: "after" }
    );
  return result;
};

const updateTaskStatus = async (id, newStatus) => {
  const db = await connectDB();
  const result = await db
    .collection("taskLogs")
    .findOneAndUpdate(
      { taskId: id, isActive: true, isDelete: false },
      { $set: { taskStatus: newStatus, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

    if(result){
      const updateTask = await db
      .collection("tasks")
      .findOneAndUpdate(
        {_id: new ObjectId(id), isActive: true, isDelete: false },
        {$set: {taskStatus: newStatus, updateAt: new Date()}},
        {returnDocument: "after"}
      )

      return result;
    }
  
};

const softDeleteTaskLog = async (id) => {
  const db = await connectDB();
  const result = await db
    .collection("taskLogs")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { isDelete: true, isActive: false, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
  return result;
};

const restoreTaskLog = async (id) => {
  const db = await connectDB();
  const result = await db
    .collection("taskLogs")
    .updateOne(
      { _id: new ObjectId(id), isDelete: true },
      { $set: { isDelete: false, isActive: true, updatedAt: new Date() } }
    );
  return result.modifiedCount > 0;
};

const hardDeleteTaskLog = async (id) => {
  const db = await connectDB();
  const result = await db
    .collection("taskLogs")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

const endTaskLog = async (id) => {
  const db = await connectDB();
  const log = await db
    .collection("taskLogs")
    .findOne({ _id: new ObjectId(id) });
  if (!log || !log.startTime) return false;
  const endTime = new Date();
  const takenDuration =
    (endTime.getTime() -
      new Date(log.startTime).getTime() -
      (log.totalPauseTime || 0)) /
    1000;
  const result = await db.collection("taskLogs").findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        endTime,
        takenDuration,
        updatedAt: new Date(),
        taskStatus: "completed",
      },
    },
    { returnDocument: "after" }
  );
  return result;
};

const pauseTaskLog = async (id) => {
  const db = await connectDB();
  const log = await db
    .collection("taskLogs")
    .findOne({ _id: new ObjectId(id) });
  if (!log || log.pauseStartTime) return false;
  const result = await db.collection("taskLogs").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        pauseStartTime: new Date(),
        taskStatus: "paused",
        updatedAt: new Date(),
      },
    }
  );
  return result.modifiedCount > 0;
};

const resumeTaskLog = async (id) => {
  const db = await connectDB();
  const log = await db
    .collection("taskLogs")
    .findOne({ _id: new ObjectId(id) });
  if (!log || !log.pauseStartTime) return false;
  const now = new Date();
  const pauseDuration = now.getTime() - new Date(log.pauseStartTime).getTime();
  const newTotalPause = (log.totalPauseTime || 0) + pauseDuration;
  const result = await db.collection("taskLogs").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        pauseStartTime: null,
        totalPauseTime: newTotalPause,
        taskStatus: "in_progress",
        updatedAt: new Date(),
      },
    }
  );
  return result.modifiedCount > 0;
};

module.exports = {
  createTaskLog,
  getAllTaskLogs,
  getTaskLogsWithFilters,
  getTaskLogById,
  getTaskLogAssignedToId,
  getTaskLogAssignedById,
  getTaskLogCreatorId,
  getTaskLogByTaskId,
  updateTaskLog,
  updateTaskStatus,
  softDeleteTaskLog,
  restoreTaskLog,
  hardDeleteTaskLog,
  endTaskLog,
  pauseTaskLog,
  resumeTaskLog,
};
