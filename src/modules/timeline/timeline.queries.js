require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");

const createTimeLineLog = async (data) => {
  const { taskId, timeLineDate, newStatus } = data;

  const db = await connectDB();

  const payload = {
    taskId,
    newStatus,
    isActive: true,
    isDelete: false,
    status: true,
    createdAt: new Date(),
    updatedAt: null,
  };

  const result = await db.collection("timeLineLog").insertOne(payload);
  return {
    taskId,
    newStatus,
    isActive: true,
    isDelete: false,
    status: true,
    createdAt: new Date(),
    updatedAt: null,
    ...result,
  };
};

const getAllTaskTimeLineLog = async (id) => {
  const db = await connectDB();
  const result = await db
    .collection("timeLineLog")
    .find({ taskId: id, isActive: true, isDelete: false })
    .toArray();

  return result;
};

module.exports = { createTimeLineLog, getAllTaskTimeLineLog };
