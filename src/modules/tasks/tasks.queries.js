require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");

const createTask = async (data) => {
  const {
    taskTitle,
    taskDescription,
    assignedBy,
    assignedTo,
    assignedDate,
    createdBy,
    labelId,
    expectedDeadline,
  } = data;

  const db = await connectDB();
  const response = await db.collection("tasks").insertOne({
    title: taskTitle,
    description: taskDescription,
    createdBy: createdBy,
    assignedBy: assignedBy,
    assignedTo: assignedTo,
    labelId: labelId,
    assignedDate: assignedDate,
    expectedDeadline: expectedDeadline,
    createAt: new Date(),
    updateAt: null,
    isActive: true,
    isDelete: false,
    status: true,
  });
  return response;
};

module.exports = { createTask };
