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
    totalInQueTime: 0,
    totalOnGoingTime: 0,
    totalReviewTime: 0,
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

const getTaskLogsWithFilters = async (startDate, endDate) => {
  const db = await connectDB();

  // Convert to actual Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  const filter = {
    isStateComplete: false,
    createdAt: {
      $gte: start,
      $lte: end,
    },
    isActive: true,
    isDelete: false,
  };

  const taskLogs = await db.collection("taskLogs").find(filter).toArray();

  if (!taskLogs || taskLogs.length === 0) {
    console.log("No task logs found for the given range.");
    return [];
  }

  // 🧠 Rest of your code unchanged
  const taskIds = [...new Set(taskLogs.map((log) => log.taskId))];

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

  const taskMap = tasks.reduce((acc, task) => {
    acc[task._id.toString()] = task;
    return acc;
  }, {});

  const userIds = [
    ...new Set(
      tasks.flatMap((t) => [
        t.taskAssignedTo,
        t.taskAssignedBy,
        t.taskCreatedBy,
      ])
    ),
  ].filter(Boolean);

  const users = await db
    .collection("users")
    .find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } })
    .project({
      username: 1,
      email: 1,
      traId: 1,
      userType: 1,
      designation: 1,
    })
    .toArray();

  const userMap = users.reduce((acc, user) => {
    acc[user._id.toString()] = user;
    return acc;
  }, {});

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

const updateTaskStatus = async (id, body) => {
  const { startTime, endTime, newStatus } = body;

  const db = await connectDB();

  // Calculate total duration (in milliseconds)
  const totalDurationMs = new Date(endTime) - new Date(startTime);

  // Convert to hours/minutes/seconds if needed
  const totalDuration = {
    milliseconds: totalDurationMs,
    seconds: Math.floor(totalDurationMs / 1000),
    minutes: Math.floor(totalDurationMs / (1000 * 60)),
    hours: Math.floor(totalDurationMs / (1000 * 60 * 60)),
  };

  // 1️⃣ Update taskLogs
  const result = await db.collection("taskLogs").findOneAndUpdate(
    { taskId: id, isActive: true, isDelete: false },
    {
      $set: {
        isStateComplete: true,
        endTime: endTime,
        totalDuration,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  // 2️⃣ Update tasks with totalDuration and status
  if (result) {
    const updateTask = await db.collection("tasks").findOneAndUpdate(
      { _id: new ObjectId(id), isActive: true, isDelete: false },
      {
        $set: {
          taskStatus: newStatus,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    return result;
  }

  return null;
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
