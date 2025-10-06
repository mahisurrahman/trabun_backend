require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");

const createTask = async (data) => {
  const {
    taskTitle,
    taskDescription,
    taskPriority,
    taskAssignedTo,
    backlog,
    deadline,
    taskCreatedBy,
    taskAssignedBy,
    assignedDate,
  } = data;

  const db = await connectDB();

  const task = {
    taskTitle,
    taskDescription,
    taskPriority,
    taskAssignedTo,
    backlog,
    expectedDeadline: deadline,
    taskCreatedBy,
    taskAssignedBy,
    assignedDate,
    taskStatus: "pending",
    createAt: new Date(),
    updateAt: null,
    isActive: true,
    isDelete: false,
    status: true,
  };

  const result = await db.collection("tasks").insertOne(task);
  return { ...task, _id: result.insertedId };
};

const taskUpdate = async (taskId, updateData) => {
  const db = await connectDB();

  const response = await db.collection("tasks").findOneAndUpdate(
    { _id: new ObjectId(taskId), isDelete: false, isActive: true },
    {
      $set: {
        ...updateData,
        updateAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return response;
};

const softRemoveTask = async (taskId) => {
  const db = await connectDB();
  const response = await db
    .collection("tasks")
    .updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { isActive: false, isDelete: true, updateAt: new Date() } }
    );
  return response;
};

// ✅ Hard Delete (permanent remove)
const hardDeleteTask = async (taskId) => {
  const db = await connectDB();
  const response = await db
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(taskId) });
  return response;
};

// ✅ Get Task by ID
const getTaskById = async (taskId) => {
  const db = await connectDB();
  const task = await db
    .collection("tasks")
    .findOne({ _id: new ObjectId(taskId), isDelete: false, isActive: true });
  return task;
};

// ✅ Get All Tasks
const getAllTasks = async () => {
  const db = await connectDB();
  const tasks = await db
    .collection("tasks")
    .find({ isActive: true, isDelete: false })
    .toArray();
  return tasks;
};

// ✅ Get Tasks by Assigned By (Boss/User who assigned)
const getTasksByAssignedById = async (userId) => {
  const db = await connectDB();
  const tasks = await db
    .collection("tasks")
    .find({ taskAssignedBy: userId, isActive: true, isDelete: false })
    .toArray();
  return tasks;
};

// ✅ Get Tasks by Assigned To (Developer)
const getTasksByAssignedToId = async (userId) => {
  const db = await connectDB();
  const tasks = await db
    .collection("tasks")
    .find({ taskAssignedTo: userId, isActive: true, isDelete: false })
    .toArray();
  return tasks;
};

// ✅ Get Tasks by Creator
const getTasksByCreatorId = async (creatorId) => {
  const db = await connectDB();
  const tasks = await db
    .collection("tasks")
    .find({ taskCreatedBy: creatorId, isActive: true, isDelete: false })
    .toArray();
  return tasks;
};

// ✅ Get Tasks by Status
const getTasksByStatus = async (status) => {
  const db = await connectDB();
  const tasks = await db
    .collection("tasks")
    .find({ taskStatus: status, isActive: true, isDelete: false })
    .toArray();
  return tasks;
};

const getTaskByBacklog = async (status) => {
  const db = await connectDB();
  const tasks = await db
    .collection("tasks")
    .find({
      backlog: true,
      taskAssignedTo: "",
      isActive: true,
      isDelete: false,
    })
    .toArray();
  return tasks;
};

const changeTaskStatusById = async (taskId, newStatus) => {
  const db = await connectDB();

  const response = await db.collection("tasks").findOneAndUpdate(
    { _id: new ObjectId(taskId), isActive: true, isDelete: false },
    { $set: { taskStatus: newStatus, updateAt: new Date() } },
    { returnDocument: "after" } // works here ✅
  );

  return response; // updated task object
};

module.exports = {
  createTask,
  taskUpdate,
  softRemoveTask,
  hardDeleteTask,
  getTaskById,
  getAllTasks,
  getTasksByAssignedById,
  getTasksByAssignedToId,
  getTasksByCreatorId,
  getTasksByStatus,
  getTaskByBacklog,
  changeTaskStatusById,
};
