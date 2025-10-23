require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");
const timeLineQueries = require("../timeline/timeline.queries");
const notificationControll = require("../notificationControll/notificationControll.queries");
const notification = require("../notification/notification.queries");

const createTaskLog = async (data) => {
  const {
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
    startTime: 0,
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
  if (result.insertedId) {
    const payload = {
      taskId: taskId,
      newStatus: taskStatus,
    };
    const resultTwo = timeLineQueries.createTimeLineLog(payload);
  }
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
      labels: 1,
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
        labels: task.labels,
      },
    };
  });
};

const getTaskLogById = async (id) => {
  const db = await connectDB();

  // 🧩 Fetch the main task log
  const log = await db
    .collection("taskLogs")
    .findOne({ _id: new ObjectId(id), isActive: true, isDelete: false });

  if (!log) {
    console.log("No task log found with the given ID.");
    return null;
  }

  // 🧩 Fetch the related task
  const task = await db.collection("tasks").findOne(
    { _id: new ObjectId(log.taskId) },
    {
      projection: {
        taskTitle: 1,
        taskDescription: 1,
        taskPriority: 1,
        taskAssignedTo: 1,
        taskAssignedBy: 1,
        taskCreatedBy: 1,
        backlog: 1,
        expectedDeadline: 1,
        assignedDate: 1,
      },
    }
  );

  if (!task) {
    // Return log alone if the related task no longer exists
    return log;
  }

  // 🧩 Collect all user IDs from the task
  const userIds = [task.taskAssignedTo, task.taskAssignedBy, task.taskCreatedBy]
    .filter(Boolean)
    .map((id) => new ObjectId(id));

  // 🧩 Fetch user details
  const users = await db
    .collection("users")
    .find({ _id: { $in: userIds } })
    .project({
      username: 1,
      email: 1,
      traId: 1,
      userType: 1,
      designation: 1,
    })
    .toArray();

  // 🧩 Create a user map for easy lookup
  const userMap = users.reduce((acc, user) => {
    acc[user._id.toString()] = user;
    return acc;
  }, {});

  // 🧩 Return enriched log (same format as `getTaskLogsWithFilters`)
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

  const totalDurationMs = new Date(endTime) - new Date(startTime);
  const totalDuration = {
    milliseconds: totalDurationMs,
    seconds: Math.floor(totalDurationMs / 1000),
    minutes: Math.floor(totalDurationMs / (1000 * 60)),
    hours: Math.floor(totalDurationMs / (1000 * 60 * 60)),
  };

  const result = await db.collection("taskLogs").findOneAndUpdate(
    { taskId: id, isStateComplete: false, isActive: true, isDelete: false },
    {
      $set: {
        isStateComplete: true,
        totalDuration,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  const stat = newStatus.toLowerCase();
  if (result._id) {
    const updateTask = await db.collection("tasks").findOneAndUpdate(
      { _id: new ObjectId(id), isActive: true, isDelete: false },
      {
        $set: {
          taskStatus: stat,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    const notifyCntrlFind = await db
      .collection("notificationControl")
      .findOne({ taskId: id, isActive: true, isDelete: false });

    if (notifyCntrlFind && notifyCntrlFind.followers?.length > 0) {
      for (const follower of notifyCntrlFind.followers) {
        await notification.createNotification({
          taskId: id,
          assignToId: follower.receiverId,
          notificationType: 1,
          message: `Task "${notifyCntrlFind.taskTitle}" status updated to "${newStatus}"`,
        });
      }
    }

    return result;
  }

  return null;
};

const startTaskLog = async (id) => {
  const db = await connectDB();
  const result = await db.collection("taskLogs").findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        startTime: new Date().toISOString(),
        isPause: false,
        updatedAt: new Date().toISOString(),
      },
    },
    { returnDocument: "after" }
  );
  return result;
};

const pauseTaskLog = async (id) => {
  const db = await connectDB();

  const fetchStartTime = await db.collection("taskLogs").findOne({
    _id: new ObjectId(id),
    isActive: true,
    isDelete: false,
  });

  if (!fetchStartTime) {
    throw new Error("Active task log not found");
  }

  if (!fetchStartTime.startTime) {
    throw new Error("Start time not found in task log");
  }

  const startTime = new Date(fetchStartTime.startTime);
  const endTime = new Date();
  const durationMs = endTime - startTime;

  let totalOnGoingTime = 0;

  if (
    !fetchStartTime.totalOnGoingTime ||
    fetchStartTime.totalOnGoingTime === 0
  ) {
    totalOnGoingTime = durationMs;
  } else {
    totalOnGoingTime = fetchStartTime.totalOnGoingTime + durationMs;
  }

  const result = await db.collection("taskLogs").findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        isPause: true,
        endTime,
        totalOnGoingTime,
        updatedAt: new Date().toISOString(),
      },
    },
    { returnDocument: "after" }
  );

  return result.value;
};

const pauseTask = async (id) => {
  const db = await connectDB();

  const findStartTime = await db
    .collection("taskLogs")
    .findOne({ _id: new ObjectId(id), isActive: true, isDelete: false });

  if (!findStartTime || !findStartTime.startTime) {
    throw new Error("Active task log or start time not found");
  }

  const startTime = new Date(findStartTime.startTime);
  const endTime = new Date();
  const diffMs = endTime - startTime;

  const totalSeconds = Math.floor(diffMs / 1000);
  const newHours = Math.floor(totalSeconds / 3600);
  const newMinutes = Math.floor((totalSeconds % 3600) / 60);
  const newSeconds = totalSeconds % 60;

  const newDurationInSeconds = newHours * 3600 + newMinutes * 60 + newSeconds;

  let previousDurationInSeconds = 0;

  if (findStartTime.totalOnGoingTime) {
    const [prevHours, prevMinutes, prevSeconds] = findStartTime.totalOnGoingTime
      .split(":")
      .map(Number);
    previousDurationInSeconds =
      prevHours * 3600 + prevMinutes * 60 + prevSeconds;
  }

  const totalDurationInSeconds =
    previousDurationInSeconds + newDurationInSeconds;

  const totalHours = Math.floor(totalDurationInSeconds / 3600);
  const totalMinutes = Math.floor((totalDurationInSeconds % 3600) / 60);
  const totalSecondsFinal = totalDurationInSeconds % 60;

  const totalDuration = `${totalHours
    .toString()
    .padStart(2, "0")}:${totalMinutes
    .toString()
    .padStart(2, "0")}:${totalSecondsFinal.toString().padStart(2, "0")}`;

  const result = await db.collection("taskLogs").findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        endTime: endTime.toISOString(),
        totalOnGoingTime: totalDuration,
        isPause: true,
        updatedAt: endTime.toISOString(),
      },
    },
    { returnDocument: "after" }
  );

  console.log("Task paused successfully:", totalDuration);
  return result;
};

const resumeTaskLog = async (id) => {
  const db = await connectDB();

  const result = await db.collection("taskLogs").findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        startTime: new Date(),
        endTime: 0,
        isPause: false,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );
  return result;
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

// const endTaskLog = async (id) => {
//   const db = await connectDB();
//   const log = await db
//     .collection("taskLogs")
//     .findOne({ _id: new ObjectId(id) });
//   if (!log || !log.startTime) return false;
//   const endTime = new Date();
//   const takenDuration =
//     (endTime.getTime() -
//       new Date(log.startTime).getTime() -
//       (log.totalPauseTime || 0)) /
//     1000;
//   const result = await db.collection("taskLogs").findOneAndUpdate(
//     { _id: new ObjectId(id) },
//     {
//       $set: {
//         endTime,
//         takenDuration,
//         updatedAt: new Date(),
//         taskStatus: "completed",
//       },
//     },
//     { returnDocument: "after" }
//   );
//   return result;
// };

// const pauseTaskLog = async (id) => {
//   const db = await connectDB();
//   const log = await db
//     .collection("taskLogs")
//     .findOne({ _id: new ObjectId(id) });
//   if (!log || log.pauseStartTime) return false;
//   const result = await db.collection("taskLogs").updateOne(
//     { _id: new ObjectId(id) },
//     {
//       $set: {
//         pauseStartTime: new Date(),
//         taskStatus: "paused",
//         updatedAt: new Date(),
//       },
//     }
//   );
//   return result.modifiedCount > 0;
// };

// const resumeTaskLog = async (id) => {
//   const db = await connectDB();
//   const log = await db
//     .collection("taskLogs")
//     .findOne({ _id: new ObjectId(id) });
//   if (!log || !log.pauseStartTime) return false;
//   const now = new Date();
//   const pauseDuration = now.getTime() - new Date(log.pauseStartTime).getTime();
//   const newTotalPause = (log.totalPauseTime || 0) + pauseDuration;
//   const result = await db.collection("taskLogs").updateOne(
//     { _id: new ObjectId(id) },
//     {
//       $set: {
//         pauseStartTime: null,
//         totalPauseTime: newTotalPause,
//         taskStatus: "in_progress",
//         updatedAt: new Date(),
//       },
//     }
//   );
//   return result.modifiedCount > 0;
// };

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
  // endTaskLog,
  // pauseTaskLog,
  // resumeTaskLog,
  startTaskLog,
  pauseTask,
  resumeTaskLog,
  pauseTaskLog,
};
